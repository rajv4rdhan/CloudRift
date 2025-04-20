const path = require('path');
const fs = require('fs-extra');
const { downloadZipFile } = require('./s3/download');
const { extractZip } = require('./utils/unzip');
const { runBuildCommands } = require('./utils/runBuild');
const { uploadBuild } = require('./s3/upload');
const { ZIP_FILE, LOCAL_DIR } = require('./config');

async function handleProject(projectName, zipFileName) {
  const zipFilePath = path.join(__dirname,'local_build', `${zipFileName}.zip`);

  await downloadZipFile(projectName, zipFileName, zipFilePath);
  const projectDir = await extractZip(zipFileName);
  await runBuildCommands(projectDir);
  await uploadBuild(projectDir,projectName);
  
  try {
    await fs.remove(LOCAL_DIR);
  } catch (error) {
    if (error.code === 'EPERM') {
      console.warn(`Warning: Failed to remove directory ${LOCAL_DIR} due to permission error:`, error.message);
    } else {
      throw error;
    }
  }

  console.log(`Project ${projectName} processed and cleaned up.`);
}

module.exports = { handleProject };
