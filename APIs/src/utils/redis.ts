import { createClient, RedisClientType } from 'redis';

const redisUrl = {
  socket: {
    host: 'redis-18107.c265.us-east-1-2.ec2.redns.redis-cloud.com',
    port: 18107,
  },
  password: 'zyNobtSXGAvT2Ph8eZFCIgxRO3hOkVW5',
};

const LIST_KEY = 'mylist';

interface JobData {
  DomainName: string;
  zipFileName: string;
  userName: string;
}

export async function pushToBuilder(DomainName: string, zipFileName: string, userName: string): Promise<void> {
  const client: RedisClientType = createClient(redisUrl);

  client.on('error', (err: Error) => {
    console.error('Redis Client Error:', err);
  });

  await client.connect();

  const randomId = Math.floor(Math.random() * 10000);
  const jobData: JobData = {
    DomainName,
    zipFileName,
    userName,
  };

  await client.rPush(LIST_KEY, JSON.stringify(jobData));
  console.log('✅ Pushed job to Redis queue:', jobData);

  await client.disconnect();
  return;
}
