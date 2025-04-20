const { consumer, LIST_KEY } = require('./redisClient');
const { handleProject } = require('../handleProject');

async function consumeQueue() {
  console.log('🚀 Waiting for projects in Redis...');

  while (true) {
    try {
      const result = await consumer.brPop(LIST_KEY, 0);
      if (result && result.element) {
        const payload = JSON.parse(result.element);
        const { DomainName, zipFileName } = payload;

        console.log(`📦 Received project - Domain: ${DomainName}, Zip: ${zipFileName}`);

        await handleProject(DomainName, zipFileName);
      }
    } catch (err) {
      console.error('❌ Error parsing or handling project:', err);
    }
  }
}

module.exports = { consumeQueue };
