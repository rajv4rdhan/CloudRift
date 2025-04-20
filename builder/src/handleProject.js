const path = require('path');
const fs = require('fs-extra');
const { connectClients } = require('./queue/redisClient');
const { consumeQueue } = require('./queue/jobQueue');
const { downloadZipFile } = require('./s3/download');
const { extractZip } = require('./utils/unzip');
const { runBuildCommands } = require('./utils/runBuild');
const { uploadBuild } = require('./s3/upload');
const { ZIP_FILE, LOCAL_DIR } = require('./config');

async function handleProject(projectName, zipFileName) {
  //const LOCAL_DIR = path.join(__dirname, 'local_build', projectName);
  const zipFilePath = path.join(__dirname,'local_build', `${zipFileName}.zip`);
  //const EXTRACT_DIR = path.join(LOCAL_DIR, 'extracted');

  await downloadZipFile(projectName, zipFileName, zipFilePath);
  const projectDir = await extractZip(zipFileName);
  await runBuildCommands(projectDir);
  await uploadBuild(projectDir,projectName);
  setTimeout(() => {
    fs.remove(LOCAL_DIR)
      .then(() => console.log('Deleted local_build folder'))
      .catch((err) => console.error('Cleanup error:', err));
  }, 2000);
  console.log(`Project ${projectName} processed and cleaned up.`);
}

// (async () => {
//   await connectClients();
//   consumeQueue();
// })();

module.exports = { handleProject };



// handleProject('trux', 'taxi')
//   .then(() => console.log('Project processed successfully.'))
//   .catch((error) => console.error('Error processing project:', error));