const redis = require('redis');

const redisUrl = {
  socket: {
    host: "redis-18107.c265.us-east-1-2.ec2.redns.redis-cloud.com",
    port: "18107"
  },
  password: "zyNobtSXGAvT2Ph8eZFCIgxRO3hOkVW5"
};

const LIST_KEY = 'mylist';

const publisher = redis.createClient(redisUrl);
const consumer = redis.createClient(redisUrl);

async function connectClients() {
  await publisher.connect();
  await consumer.connect();
}

module.exports = {
  connectClients,
  publisher,
  consumer,
  LIST_KEY
};
