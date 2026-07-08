import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { reviewRouter } from './review.router';

const s = initServer();

export const reviewPlugin = fp((fastify: FastifyInstance) => {
  fastify.register(s.plugin(reviewRouter));
});
