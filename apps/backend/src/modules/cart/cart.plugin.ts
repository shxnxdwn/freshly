import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { cartRouter } from './cart.router';

const s = initServer();

export const cartPlugin = fp((fastify: FastifyInstance) => {
  fastify.register(s.plugin(cartRouter));
});
