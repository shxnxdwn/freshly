import { initServer } from '@ts-rest/fastify';
import { userContract } from '@freshly/contracts';
import { userService } from './user.service';

const s = initServer();

export const userRouter = s.router(userContract, {
  getUser: async ({ request }) => ({
    status: 200,
    body: await userService.getUser(request.user.userId)
  }),

  updateUser: async ({ request, body }) => ({
    status: 200,
    body: await userService.updateUser(request.user.userId, body)
  }),

  deleteUser: async ({ request }) => {
    await userService.deleteUser(request.user.userId);
    return { status: 200, body: { success: true as const } };
  }
});
