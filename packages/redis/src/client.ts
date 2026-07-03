import 'dotenv/config';
import Redis from 'ioredis';

const getRedisClient = (): Redis => {
  const url = process.env.REDIS_URL;

  if (!url) {
    throw new Error('[Redis] REDIS_URL is not defined');
  }

  const client = new Redis(url, {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    retryStrategy(times) {
      return Math.min(times * 200, 2000);
    }
  });

  client.on('error', (err) => {
    console.error('[Redis] Connection error:', err);
  });

  return client;
};

export const redis = getRedisClient();
