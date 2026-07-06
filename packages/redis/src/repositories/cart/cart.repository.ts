import type { ProductId, UserId } from '@freshly/contracts';
import { redis } from '../../client';
import { RedisKeys } from '../../keys';
import { unwrapMultiResult } from '../../utils/unwrap-multi-result';
import { CART_TTL_SECONDS } from './cart.constants';
import type { CartItems } from './cart.types';
import { isValidProductId, isValidQuantity } from './cart.validations';

export const cartRepository = {
  async getItems(userId: UserId): Promise<CartItems> {
    const key = RedisKeys.cart(userId);
    const result = await redis.multi().hgetall(key).expire(key, CART_TTL_SECONDS).exec();

    const hgetallResult = unwrapMultiResult<Record<string, string> | null>(result, 0);
    const raw = hgetallResult ?? {};
    const items: CartItems = {};

    for (const [productId, quantity] of Object.entries(raw)) {
      const parsedProductId = Number(productId);
      const parsedQuantity = Number(quantity);

      if (!isValidProductId(parsedProductId) || !isValidQuantity(parsedQuantity)) {
        throw new Error(`[Redis] Corrupted cart entry for user ${userId}: productId="${productId}", quantity="${quantity}"`);
      }

      items[parsedProductId as ProductId] = parsedQuantity;
    }

    return items;
  },

  async addItem(userId: UserId, productId: ProductId): Promise<boolean> {
    if (!isValidProductId(productId)) {
      throw new Error(`[Redis] Invalid productId: ${productId}`);
    }

    const key = RedisKeys.cart(userId);
    const result = await redis.multi().hsetnx(key, String(productId), 1).expire(key, CART_TTL_SECONDS).exec();
    return unwrapMultiResult<number>(result, 0) === 1;
  },

  async updateItem(userId: UserId, productId: ProductId, quantity: number): Promise<void> {
    if (!isValidProductId(productId)) {
      throw new Error(`[Redis] Invalid productId: ${productId}`);
    }

    const key = RedisKeys.cart(userId);

    if (quantity === 0) {
      const result = await redis.multi().hdel(key, String(productId)).expire(key, CART_TTL_SECONDS).exec();
      unwrapMultiResult(result, 0);
      return;
    }

    if (!isValidQuantity(quantity)) {
      throw new Error(`[Redis] Invalid quantity for product ${productId}: ${quantity}`);
    }

    const result = await redis.multi().hset(key, String(productId), quantity).expire(key, CART_TTL_SECONDS).exec();
    unwrapMultiResult(result, 0);
  },

  async removeItem(userId: UserId, productId: ProductId): Promise<boolean> {
    const deletedCount = await redis.hdel(RedisKeys.cart(userId), String(productId));
    return deletedCount > 0;
  },

  async clearCart(userId: UserId): Promise<boolean> {
    const deletedCount = await redis.del(RedisKeys.cart(userId));
    return deletedCount > 0;
  }
};
