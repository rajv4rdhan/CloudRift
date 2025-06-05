const path = require('path');
const fs = require('fs-extra');
const { downloadZipFile } = require('./s3/download');
const { extractZip } = require('./utils/unzip');
const { runBuildCommands } = require('./utils/runBuild');
const { uploadBuild } = require('./s3/upload');
const { ZIP_FILE, LOCAL_DIR } = require('./config');

async function handleProject(projectName, zipFileName) {
  const zipFilePath = path.join(__dirname,'local_build', `${zipFileName}.zip`);

  try {
    await downloadZipFile(projectName, zipFileName, zipFilePath);
  } catch (error) {
    console.error(`Error downloading zip file for project ${projectName}:`, error.message);
    throw error;
  }

  let projectDir;
  try {
    projectDir = await extractZip(zipFileName);
  } catch (error) {
    console.error(`Error extracting zip file ${zipFileName}:`, error.message);
    throw error;
  }

  try {
    await runBuildCommands(projectDir);
  } catch (error) {
    console.error(`Error running build commands for project ${projectName}:`, error.message);
    throw error;
  }

  try {
    await uploadBuild(projectDir, projectName);
  } catch (error) {
    console.error(`Error uploading build for project ${projectName}:`, error.message);
    throw error;
  }
  
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
