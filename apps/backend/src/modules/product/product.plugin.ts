import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { productRouter } from './product.router';

const s = initServer();

export const productPlugin = fp((fastify: FastifyInstance) => {
  fastify.register(s.plugin(productRouter));
});
