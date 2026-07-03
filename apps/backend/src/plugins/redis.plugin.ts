import fp from 'fastify-plugin';
import { createClient } from 'redis';

export default fp(async (fastify) => {
  const client = createClient({ url: process.env.REDIS_URL });

  client.on('error', (err) => fastify.log.error('Redis Client Error', err));

  await client.connect();

  fastify.decorate('redis', client);
});
