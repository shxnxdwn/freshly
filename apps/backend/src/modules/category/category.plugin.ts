import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { categoryRouter } from './category.router';

const s = initServer();

export const categoryPlugin = fp((fastify: FastifyInstance) => {
  fastify.register(s.plugin(categoryRouter));
});
