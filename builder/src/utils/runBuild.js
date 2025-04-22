function runBuildCommands(projectDir, logs = []) {
  return new Promise((resolve, reject) => {
    const child = exec('npm install && npm run build', { cwd: projectDir });

    child.stdout.on('data', (data) => {
      logs.push(data.toString());
      process.stdout.write(data);
    });

    child.stderr.on('data', (data) => {
      logs.push(data.toString());
      process.stderr.write(data);
    });

    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Build failed with exit code ${code}`));
    });

    child.on('close', () => {
      setTimeout(() => resolve(), 1000);
    });
  });
}
