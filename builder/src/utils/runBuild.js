const { exec } = require('child_process');

function runBuildCommands(projectDir) {
  return new Promise((resolve, reject) => {
    const child = exec('npm install && npm run build', { cwd: projectDir });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Build failed with exit code ${code}`));
    });

    child.on('close', () => {
      setTimeout(() => resolve(), 1000);
    });
  });
}


module.exports = {runBuildCommands};
