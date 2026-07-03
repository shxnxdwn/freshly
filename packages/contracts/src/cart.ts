import { z } from 'zod';
import { c } from './contract';
import { CommonErrors, ProductIdSchema } from './common';

export const CartItemSchema = z.object({
  productId: ProductIdSchema,
  name: z.string(),
  imageUrl: z.string().url(),
  price: z.number().int().positive(),
  salePrice: z.number().int().positive().nullable(),
  quantity: z.number().int().positive(),
  isUnavailable: z.boolean()
});

export type CartItem = z.infer<typeof CartItemSchema>;

export const CartSchema = z.object({
  items: z.array(CartItemSchema),
  total: z.number().int().nonnegative(),
  itemCount: z.number().int().nonnegative()
});

export type Cart = z.infer<typeof CartSchema>;

export const AddCartItemBodySchema = z.object({
  productId: ProductIdSchema,
  quantity: z.number().int().positive().default(1)
});

export type AddCartItemBody = z.infer<typeof AddCartItemBodySchema>;

export const UpdateCartItemBodySchema = z.object({
  quantity: z.number().int().positive()
});

export type UpdateCartItemBody = z.infer<typeof UpdateCartItemBodySchema>;

const CartItemParamsSchema = z.object({ productId: ProductIdSchema });

export const cartContract = c.router({
  getCart: {
    method: 'GET',
    path: '/cart',
    responses: {
      200: CartSchema,
      ...CommonErrors
    },
    summary: 'Get cart'
  },
  addItem: {
    method: 'POST',
    path: '/cart/items',
    body: AddCartItemBodySchema,
    responses: {
      200: CartSchema,
      ...CommonErrors
    },
    summary: 'Add item to cart'
  },
  updateItem: {
    method: 'PATCH',
    path: '/cart/items/:productId',
    pathParams: CartItemParamsSchema,
    body: UpdateCartItemBodySchema,
    responses: {
      200: CartSchema,
      ...CommonErrors
    },
    summary: 'Update item quantity'
  },
  removeItem: {
    method: 'DELETE',
    path: '/cart/items/:productId',
    pathParams: CartItemParamsSchema,
    body: z.object({}),
    responses: {
      200: CartSchema,
      ...CommonErrors
    },
    summary: 'Remove item from cart'
  },
  clearCart: {
    method: 'DELETE',
    path: '/cart',
    body: z.object({}),
    responses: {
      200: CartSchema,
      ...CommonErrors
    },
    summary: 'Clear cart'
  }
});
