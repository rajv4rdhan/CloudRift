const fs = require('fs-extra');
const { LOCAL_DIR } = require('./config');

async function cleanup() {
    await fs.remove(LOCAL_DIR);
    console.log('Cleaned up local files.');
}

module.exports = cleanup;
