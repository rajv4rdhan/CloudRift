const path = require('path');
const fs = require('fs-extra');
const { downloadZipFile } = require('./s3/download');
const { extractZip } = require('./utils/unzip');
const { runBuildCommands } = require('./utils/runBuild');
const { uploadBuild } = require('./s3/upload');
const { ZIP_FILE, LOCAL_DIR } = require('./config');
const dayjs = require('dayjs'); // or use new Date().toISOString()

async function handleProject(projectName, zipFileName, username) {
  const zipFilePath = path.join(__dirname, 'local_build', `${zipFileName}.zip`);
  const logs = [];
  const startTime = Date.now();

  const logAndCapture = (msg) => {
    logs.push(msg);
    console.log(msg);
  };

  try {
    logAndCapture(`⬇️ Downloading ${zipFileName} for ${projectName}`);
    await downloadZipFile(projectName, zipFileName, zipFilePath);

    const projectDir = await extractZip(zipFileName);
    await runBuildCommands(projectDir, logs);

    await uploadBuild(projectDir, projectName);
    await fs.remove(LOCAL_DIR);

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    return {
      type: "build",
      status: "success",
      message: "Build completed successfully",
      details: `Build completed in ${duration} seconds`,
      timestamp: dayjs().format("MMM D, YYYY HH:mm:ss"),
      logs: logs.join('\n'),
      domain: projectName,
    };
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    return {
      type: "build",
      status: "error",
      message: error.message,
      details: `Build failed after ${duration} seconds`,
      timestamp: dayjs().format("MMM D, YYYY HH:mm:ss"),
      logs: logs.join('\n'),
      domain: projectName,
    };
  }
}


module.exports = { handleProject };