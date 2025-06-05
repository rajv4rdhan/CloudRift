const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs-extra');
const { LOCAL_DIR } = require('../config');

async function extractZip(zipFileName) {
    console.log(`Extracting ${zipFileName}...`);
    console.log(`Zip file path: ${path.join(LOCAL_DIR, `${zipFileName}.zip`)}`);
    
    const ZIP_FILE = path.join(LOCAL_DIR, `${zipFileName}.zip`);
    
    const zip = new AdmZip(ZIP_FILE);
    const extractTo = path.join(LOCAL_DIR, 'extracted_project');
    zip.extractAllTo(extractTo, true);

    const entries = await fs.readdir(extractTo, { withFileTypes: true });
    const extractedFolder = entries.find(e => e.isDirectory());

    if (!extractedFolder) throw new Error('No folder found in zip');

    return path.join(extractTo, extractedFolder.name);
}

module.exports = {extractZip};
