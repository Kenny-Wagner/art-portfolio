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

const createPresignedUrl = async ({key, contentType}) => {
    console.log(`key is ${key}`)
    const command = new PutObjectCommand ({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType
    })
    const fileLink = `https://${BUCKET_NAME}.s3.${AWS.Region}.amazonaws.com/${key}`;
    try {
        const signedUrl = await getSignedUrl(s3, command, {
            expiresIn: 5 * 60 // 5 minutes - default is 15 mins
        });
        return {fileLink, signedUrl};  
    } catch (err) {
        console.log(`error is ${err.message}`)
    }

}

const createImage = async () => {

}

const updateImage = async () => {

}

const deleteImage = async (imageUrl) => {
    const command = new DeleteObjectCommand ({
        Bucket: AWS.BucketName,
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

module.exports = { createImage, updateImage }