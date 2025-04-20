const { exec } = require('child_process');

function runBuildCommands(projectDir) {
    return new Promise((resolve, reject) => {
        exec('npm install && npm run build', { cwd: projectDir }, (err, stdout, stderr) => {
            if (err) {
                console.error('Build error:', stderr);
                reject(err);
            } else {
                console.log('Build successful:', stdout);
                resolve();
            }
        });
    });
}

module.exports = {runBuildCommands};
