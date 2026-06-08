export const RedisKeys = {
  cart: (userId: string) => `cart:${userId}`
} as const;
