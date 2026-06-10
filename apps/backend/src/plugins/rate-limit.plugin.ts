import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';
import type { FastifyInstance } from 'fastify';
import { redis } from '@freshly/redis';

export const rateLimitPlugin = fp(async (app: FastifyInstance) => {
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
    redis,
    errorResponseBuilder: () => ({
      code: 'TOO_MANY_REQUESTS',
      message: 'Rate limit exceeded, please try again later'
    })
  });
});
