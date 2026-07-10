import { initServer } from '@ts-rest/fastify';
import { addressContract } from '@freshly/contracts';
import { addressService } from './address.service';

const s = initServer();

export const addressRouter = s.router(addressContract, {
  getAddresses: async ({ request }) => ({
    status: 200,
    body: await addressService.getAddresses(request.user.userId)
  }),

  createAddress: async ({ request, body }) => ({
    status: 201,
    body: await addressService.createAddress(request.user.userId, body)
  }),

  updateAddress: async ({ request, params, body }) => ({
    status: 200,
    body: await addressService.updateAddress(request.user.userId, params.id, body)
  }),

  deleteAddress: async ({ request, params }) => {
    await addressService.deleteAddress(request.user.userId, params.id);
    return { status: 200, body: { success: true as const } };
  }
});
