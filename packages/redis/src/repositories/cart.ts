import type { ProductId, UserId } from '@freshly/contracts';
import { redis } from '../client';
import { RedisKeys } from '../keys';

const CART_TTL_SECONDS = 60 * 60 * 24 * 365;

export type CartItems = Record<ProductId, number>;

export const cartRepository = {
  async getItems(userId: UserId): Promise<CartItems> {
    const key = RedisKeys.cart(userId);
    const result = await redis.multi().hgetall(key).expire(key, CART_TTL_SECONDS).exec();
    const raw = (result?.[0]?.[1] as Record<string, string> | null) ?? {};

    const items: CartItems = {};
    for (const [productId, quantity] of Object.entries(raw)) {
      items[Number(productId) as ProductId] = Number(quantity);
    }
    return items;
  },

  async addItem(userId: UserId, productId: ProductId): Promise<void> {
    const key = RedisKeys.cart(userId);
    await redis.multi().hset(key, String(productId), 1).expire(key, CART_TTL_SECONDS).exec();
  },

  async updateItem(userId: UserId, productId: ProductId, quantity: number): Promise<void> {
    const key = RedisKeys.cart(userId);
    await redis.multi().hset(key, String(productId), quantity).expire(key, CART_TTL_SECONDS).exec();
  },

  async removeItem(userId: UserId, productId: ProductId): Promise<void> {
    await redis.hdel(RedisKeys.cart(userId), String(productId));
  },

  async clearCart(userId: UserId): Promise<void> {
    await redis.del(RedisKeys.cart(userId));
  }
};
