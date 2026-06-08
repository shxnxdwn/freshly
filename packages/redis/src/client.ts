import 'dotenv/config';
import Redis from 'ioredis';

const getRedisClient = (): Redis => {
  const url = process.env.REDIS_URL;

  if (!url) {
    throw new Error('[Redis] REDIS_URL is not defined');
  }

  const client = new Redis(url, {
    tls: {},
    maxRetriesPerRequest: 3,
    lazyConnect: true
  });

  client.on('error', (err) => {
    console.error('[Redis] connection error:', err);
  });

  return client;
};

export const redis = getRedisClient();
