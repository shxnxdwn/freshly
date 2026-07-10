import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { addressRouter } from './address.router';

const s = initServer();

export const addressPlugin = fp((fastify: FastifyInstance) => {
  fastify.register(s.plugin(addressRouter));
});
