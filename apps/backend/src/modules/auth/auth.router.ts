import { initServer } from '@ts-rest/fastify';
import { authContract } from '@freshly/contracts';
import { authService } from './auth.service';

const s = initServer();

export const authRouter = s.router(authContract, {
  register: async ({ reply, body }) => ({
    status: 201,
    body: await authService.register(reply, body)
  }),

  login: async ({ reply, body }) => ({
    status: 200,
    body: await authService.login(reply, body)
  }),

  refresh: async ({ request, reply }) => ({
    status: 200,
    body: await authService.refresh(request, reply)
  }),

  logout: async ({ request, reply }) => {
    await authService.logout(request, reply);
    return { status: 200, body: { success: true as const } };
  }
});
