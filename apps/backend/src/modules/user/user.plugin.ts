import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { userRouter } from './user.router';

const s = initServer();

export const userPlugin = fp((fastify: FastifyInstance) => {
  fastify.register(s.plugin(userRouter));
});
