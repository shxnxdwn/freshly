import { z } from 'zod';
import { c } from './contract';
import {
  AddressIdSchema,
  CommonErrors,
  DateTimeSchema,
  OrderIdSchema,
  OrderItemIdSchema,
  paginatedOf,
  PaginationQuerySchema,
  ProductIdSchema
} from './common';
import { CartSchema } from './cart';

export const OrderStatusSchema = z.enum(['created', 'paid', 'assembling', 'delivering', 'delivered', 'cancelled']);
export type OrderStatus = z.infer<typeof OrderStatusSchema>;

export const PaymentStatusSchema = z.enum(['pending', 'succeeded', 'failed', 'refunded']);
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

export const OrderAddressSchema = z.object({
  city: z.string(),
  street: z.string(),
  house: z.string(),
  housing: z.string().nullable(),
  entrance: z.string().nullable(),
  floor: z.string().nullable(),
  apartment: z.string().nullable(),
  intercom: z.string().nullable()
});

export type OrderAddress = z.infer<typeof OrderAddressSchema>;

export const OrderItemSchema = z.object({
  id: OrderItemIdSchema,
  productId: ProductIdSchema,
  quantity: z.number().int().positive(),
  priceAtPurchase: z.number().int().positive(),
  productNameSnapshot: z.string(),
  productSkuSnapshot: z.string()
});

export type OrderItem = z.infer<typeof OrderItemSchema>;

export const OrderSchema = z.object({
  id: OrderIdSchema,
  orderNumber: z.number().int().positive(),
  status: OrderStatusSchema,
  paymentStatus: PaymentStatusSchema,
  totalAmount: z.number().int().positive(),
  address: OrderAddressSchema,
  items: z.array(OrderItemSchema),
  userComment: z.string().max(500).nullable(),
  estimatedDeliveryAt: DateTimeSchema.nullable(),
  actualDeliveryAt: DateTimeSchema.nullable(),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema
});

export type Order = z.infer<typeof OrderSchema>;

export const CreateOrderBodySchema = z.object({
  addressId: AddressIdSchema,
  userComment: z.string().max(500).optional()
});

export type CreateOrderBody = z.infer<typeof CreateOrderBodySchema>;

const OrderParamsSchema = z.object({ id: OrderIdSchema });

export const orderContract = c.router({
  getOrders: {
    method: 'GET',
    path: '/orders',
    query: PaginationQuerySchema,
    responses: {
      200: paginatedOf(OrderSchema),
      ...CommonErrors
    },
    summary: 'Get order history'
  },
  getOrder: {
    method: 'GET',
    path: '/orders/:id',
    pathParams: OrderParamsSchema,
    responses: {
      200: OrderSchema,
      ...CommonErrors
    },
    summary: 'Get order by id'
  },
  createOrder: {
    method: 'POST',
    path: '/orders',
    body: CreateOrderBodySchema,
    responses: {
      201: OrderSchema,
      ...CommonErrors
    },
    summary: 'Create order from cart'
  },
  cancelOrder: {
    method: 'POST',
    path: '/orders/:id/cancel',
    pathParams: OrderParamsSchema,
    body: z.object({}),
    responses: {
      200: OrderSchema,
      ...CommonErrors
    },
    summary: 'Cancel order (available for created and paid statuses)'
  },
  reorder: {
    method: 'POST',
    path: '/orders/:id/reorder',
    pathParams: OrderParamsSchema,
    body: z.object({}),
    responses: {
      200: CartSchema,
      ...CommonErrors
    },
    summary: 'Clear cart and refill with items from this order'
  }
});
