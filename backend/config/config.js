require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;
const AWS = {
        AccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        AWSSecretKey: process.env.AWS_SECRET_KEY,
        BucketName: process.env.AWS_S3_BUCKET_NAME,
        Region: "us-east-2"
};

console.log(`'AWS is ${JSON.stringify(AWS)}`)
module.exports = { DATABASE_URL, PORT, AWS}
