import type { TCart, TCartItem } from '@freshly/contracts';
import { redis } from '../client.js';
import { RedisKeys } from '../keys.js';

const CART_TTL_DAYS = 90;
const CART_TTL_SECONDS = CART_TTL_DAYS * 24 * 60 * 60;

export const cartRepository = {
  async get(userId: string): Promise<TCart> {
    const raw = await redis.get(RedisKeys.cart(userId));

    if (!raw) {
      return { items: [], total: 0, itemCount: 0 };
    }

    return JSON.parse(raw) as TCart;
  },

  async set(userId: string, cart: TCart): Promise<void> {
    await redis.set(RedisKeys.cart(userId), JSON.stringify(cart), 'EX', CART_TTL_SECONDS);
  },

  async clear(userId: string): Promise<void> {
    await redis.del(RedisKeys.cart(userId));
  },

  async addItem(userId: string, item: TCartItem): Promise<TCart> {
    const cart = await this.get(userId);
    const exists = cart.items.some((i) => i.productId === item.productId);

    const updatedItems = exists
      ? cart.items.map((i) => (i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i))
      : [...cart.items, item];

    const updated = recalculate({ ...cart, items: updatedItems });
    await this.set(userId, updated);
    return updated;
  },

  async updateItem(userId: string, productId: number, quantity: number): Promise<TCart> {
    if (quantity <= 0) {
      return this.removeItem(userId, productId);
    }

    const cart = await this.get(userId);
    const updatedItems = cart.items.map((i) => (i.productId === productId ? { ...i, quantity } : i));

    const updated = recalculate({ ...cart, items: updatedItems });
    await this.set(userId, updated);
    return updated;
  },

  async removeItem(userId: string, productId: number): Promise<TCart> {
    const cart = await this.get(userId);
    const updatedItems = cart.items.filter((i) => i.productId !== productId);

    const updated = recalculate({ ...cart, items: updatedItems });
    await this.set(userId, updated);
    return updated;
  },

  async refreshTtl(userId: string): Promise<void> {
    await redis.expire(RedisKeys.cart(userId), CART_TTL_SECONDS);
  }
};

const recalculate = (cart: TCart): TCart => {
  const availableItems = cart.items.filter((i) => !i.isUnavailable);

  return {
    ...cart,
    total: availableItems.reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.quantity, 0),
    itemCount: availableItems.reduce((sum, i) => sum + i.quantity, 0)
  };
};
