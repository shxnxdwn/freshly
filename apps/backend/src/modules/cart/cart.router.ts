import { initServer } from '@ts-rest/fastify';
import { cartContract } from '@freshly/contracts';
import { cartService } from './cart.service';

const s = initServer();

export const cartRouter = s.router(cartContract, {
  getCart: async ({ request }) => ({ status: 200, body: await cartService.getCart(request.user.userId) }),

  addItem: async ({ request, body }) => ({
    status: 200,
    body: await cartService.addItem(request.user.userId, body.productId)
  }),

  updateItem: async ({ request, params, body }) => ({
    status: 200,
    body: await cartService.updateItem(request.user.userId, params.productId, body.quantity)
  }),

  removeItem: async ({ request, params }) => ({
    status: 200,
    body: await cartService.removeItem(request.user.userId, params.productId)
  }),

  clearCart: async ({ request }) => ({ status: 200, body: await cartService.clearCart(request.user.userId) })
});
