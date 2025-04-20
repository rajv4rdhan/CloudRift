const { connectClients } = require('./queue/redisClient');
const { consumeQueue } = require('./queue/jobQueue');

async function main() {
  try {
    await connectClients();
    await consumeQueue(); // this will block and run indefinitely
  } catch (error) {
    console.error('❌ Error connecting to clients:', error);
  }
}

main();
