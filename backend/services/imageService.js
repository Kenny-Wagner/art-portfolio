const axios = require('axios')
const { PutObjectCommand, DeleteObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { AWS } = require('../config/config');

const s3 = new S3Client({
    region: AWS.Region,
    credentials: {
        accessKeyId: AWS.AccessKeyId,
        secretAccessKey: AWS.AWSSecretKey
    }
})
const BUCKET_NAME = AWS.BucketName

const createPresignedUrl = async (key, contentType) => {
    console.log(`key is ${key}`)
    const command = new PutObjectCommand ({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType
    })
    const imageUrl = `https://${BUCKET_NAME}.s3.${AWS.Region}.amazonaws.com/${key}`;
    try {
        const signedUrl = await getSignedUrl(s3, command, {
            expiresIn: 5 * 60 // 5 minutes - default is 15 mins
        });
        return {imageUrl, signedUrl};  
    } catch (err) {
        console.log(`error in createPresignedUrl is ${err.message}`)
    }

}

const createImage = async (file, key) => {
    //First create presigned url to upload to
    const fileType = file.mimetype;
    const {imageUrl, signedUrl} = await createPresignedUrl(key, fileType)
    //Upload image to s3
    try {
        await axios.put(
            signedUrl, 
            file.buffer, 
            { headers: { "Content-Type": fileType }}
        )
        return imageUrl;
    } catch (err) {
            console.log(`Error in imageservice.createImage: ${err.message}`)
        }
    };

const deleteImage = async (imageUrl) => {
    const command = new DeleteObjectCommand ({
        Bucket: AWS.BucketName,
        //grab key from imageUrl
        Key: imageUrl.replace(`https://${BUCKET_NAME}.s3.${AWS.Region}.amazonaws.com/`, '') 
    })
    try {
        const response = await s3.send(command)
        return response 
    }
    catch (err) {
        console.log(`error is ${err.message}`)
    }
}

module.exports = { createImage, deleteImage}