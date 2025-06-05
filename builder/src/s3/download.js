const { GetObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const fs = require('fs-extra');
const { LOCAL_DIR, BUCKET_NAME, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = require('../config');

const s3 = new S3Client({
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
    region: REGION,
});

async function downloadZipFile(projectDomaine, zipFileName, zipFilePath) {
    const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: `${projectDomaine}/build/${zipFileName}.zip`,
    });

    const data = await s3.send(command);

    await fs.ensureDir(LOCAL_DIR);

    return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(zipFilePath);
        data.Body.pipe(stream);
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
}

module.exports = {downloadZipFile};
