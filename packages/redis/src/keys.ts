import type { z } from 'zod';
import type { UserIdSchema } from '@freshly/contracts';

type UserId = z.infer<typeof UserIdSchema>;

export const RedisKeys = {
  cart: (userId: UserId) => `cart:${userId}`
} as const;
