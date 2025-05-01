const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const { BUCKET_NAME, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = require('../config');

const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
    region: REGION,
});

module.exports = {s3};