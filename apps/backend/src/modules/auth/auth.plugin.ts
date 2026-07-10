import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { authRouter } from './auth.router';

const s = initServer();

export const authPlugin = fp((fastify: FastifyInstance) => {
  fastify.register(s.plugin(authRouter));
});
