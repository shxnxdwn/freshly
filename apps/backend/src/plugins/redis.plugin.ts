import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { redis } from '@freshly/redis';

export const redisPlugin = fp(async (fastify: FastifyInstance) => {
  await redis.connect();
  fastify.log.info('Redis connected');

  fastify.addHook('onClose', async () => {
    await redis.quit();
  });
});
