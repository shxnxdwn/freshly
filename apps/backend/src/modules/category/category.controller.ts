import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { categoryContract } from '@freshly/contracts';
import { categoryService } from './category.service';

const s = initServer();

const categoryRouter = s.router(categoryContract, {
  getCategories: async () => ({ status: 200, body: await categoryService.getCategories() })
});

export const categoryController = fp((fastify: FastifyInstance) => {
  fastify.register(s.plugin(categoryRouter));
});
