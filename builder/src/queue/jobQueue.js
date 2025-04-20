const { consumer, LIST_KEY } = require('./redisClient');
const { handleProject } = require('../index');

async function consumeQueue() {
  console.log('Waiting for projects in Redis...');

  while (true) {
    const result = await consumer.brPop(LIST_KEY, 0); // Blocking call
    if (result && result.element) {
      try {
        const { username, domain } = JSON.parse(result.element);
        const projectName = domain;
        console.log(`Received project: ${projectName}`);
        await handleProject(projectName);
      } catch (err) {
        console.error('Error parsing or handling project:', err);
      }
    }
  }
}

module.exports = { consumeQueue };
