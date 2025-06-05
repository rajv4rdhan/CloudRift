const fs = require('fs-extra');
const path = require('path');

function safeDelete(dirPath, retries = 3, delay = 1000) {
    const attempt = async (count) => {
      try {
        await fs.rm(dirPath, { recursive: true, force: true });
        console.log(`Successfully deleted ${dirPath}`);
      } catch (err) {
        if (count > 0 && err.code === 'EPERM') {
          console.warn(`Retrying delete (${retries - count + 1})...`);
          setTimeout(() => attempt(count - 1), delay);
        } else {
          console.error('Final cleanup failed:', err);
        }
      }
    };
  
    attempt(retries);
  }
  
  module.exports = {safeDelete};