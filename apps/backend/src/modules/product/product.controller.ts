import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { productContract } from '@freshly/contracts';
import { productService } from './product.service';

const s = initServer();

const productRouter = s.router(productContract, {
  getProducts: async ({ query }) => ({ status: 200, body: await productService.getProducts(query) }),

  getProduct: async ({ params }) => ({
    status: 200,
    body: await productService.getProductBySlug(params.slug)
  })
});

export const productController = fp((fastify: FastifyInstance) => {
  fastify.register(s.plugin(productRouter));
});
