const { spawn } = require('child_process');

function runBuildCommands(projectDir, logs = []) {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', ['install'], { cwd: projectDir, shell: true });

    child.stdout.on('data', data => {
      logs.push(data.toString());
      process.stdout.write(data);
    });

    child.stderr.on('data', data => {
      logs.push(data.toString());
      process.stderr.write(data);
    });

    child.on('close', (code) => {
      if (code !== 0) return reject(new Error(`npm install failed with code ${code}`));

      const build = spawn('npm', ['run', 'build'], { cwd: projectDir, shell: true });

      build.stdout.on('data', data => {
        logs.push(data.toString());
        process.stdout.write(data);
      });

      build.stderr.on('data', data => {
        logs.push(data.toString());
        process.stderr.write(data);
      });

      build.on('close', (buildCode) => {
        if (buildCode === 0) {
          resolve();
        } else {
          reject(new Error(`Build failed with code ${buildCode}`));
        }
      });
    });

    child.on('error', reject);
  });
}


module.exports = { runBuildCommands };
