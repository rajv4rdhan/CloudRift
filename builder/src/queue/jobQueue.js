const { consumer, LIST_KEY } = require('./redisClient');
const { handleProject } = require('../handleProject');
const { sendToDb } = require('../utils/sendTodb');
async function consumeQueue() {
  console.log('🚀 Waiting for projects...');

  while (true) {
    try {
      const result = await consumer.brPop(LIST_KEY, 0);
      if (result && result.element) {
        const payload = JSON.parse(result.element);
        const { DomainName, zipFileName, username } = payload;

        console.log(`📦 Received project - Domain: ${DomainName}, Zip: ${zipFileName}`);

        const logEntry = {
          type: 'build',
          status: '',
          message: '',
          details: '',
          timestamp: new Date().toLocaleString(),
          domain: DomainName,
        };

        try {
          await handleProject(DomainName, zipFileName);

          logEntry.status = 'success';
          logEntry.message = 'Build completed successfully';
          logEntry.details = `Build completed at ${new Date().toLocaleTimeString()}`;
        } catch (error) {
          logEntry.status = 'error';
          logEntry.message = 'Build failed';
          logEntry.details = error.message;
        }

        await sendToDb(logEntry, username);
      }
    } catch (err) {
      console.error('❌ Error parsing or handling project:', err);
    }
  }
}

module.exports = { consumeQueue };
