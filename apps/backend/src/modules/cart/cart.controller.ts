import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { cartContract } from '@freshly/contracts';
import { cartService } from './cart.service';

const s = initServer();

const cartRouter = s.router(cartContract, {
  getCart: async ({ request }) => ({ status: 200, body: await cartService.getCart(request.user.id) }),

  addItem: async ({ request, body }) => ({
    status: 200,
    body: await cartService.addItem(request.user.id, body.productId)
  }),

  updateItem: async ({ request, params, body }) => ({
    status: 200,
    body: await cartService.updateItem(request.user.id, params.productId, body.quantity)
  }),

  removeItem: async ({ request, params }) => ({
    status: 200,
    body: await cartService.removeItem(request.user.id, params.productId)
  }),

  clearCart: async ({ request }) => ({ status: 200, body: await cartService.clearCart(request.user.id) })
});

export const cartController = fp(async (fastify: FastifyInstance) => {
  fastify.register(s.plugin(cartRouter));
});
