const { PutObjectCommand} = require('@aws-sdk/client-s3');
const fs = require('fs-extra');
const path = require('path');
const mime = require('mime-types');
const { BUCKET_NAME, REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY } = require('../config');
const {s3} = require('../config/s3');


async function uploadBuild(projectDir, projectName) {
    const distFolder = path.join(projectDir, 'dist');

    const walk = async (dir) => {
        const entries = await fs.readdir(dir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const relativePath = path.relative(distFolder, fullPath).replace(/\\/g, '/');

            if (entry.isDirectory()) {
                await walk(fullPath);
            } else {
                const content = await fs.readFile(fullPath);
                const contentType = mime.lookup(fullPath) || 'application/octet-stream';

                await s3.send(new PutObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: `${projectName}/${relativePath}`,
                    Body: content,
                    ContentType: contentType 
                }));

                console.log(`Uploaded ${relativePath} as ${contentType}`);
            }
        }
    };

    await walk(distFolder);
}

module.exports = { uploadBuild };
