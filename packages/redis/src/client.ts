import 'dotenv/config';
import Redis from 'ioredis';
import pino from 'pino';

const logger = pino({ name: '@freshly/redis' });

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
    logger.error({ err }, '[Redis] Connection error');
  });

  return client;
};

export const redis = getRedisClient();
