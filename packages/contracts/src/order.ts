import { z } from 'zod';
import { c } from './contract';
import {
  OrderId,
  AddressId,
  ProductId,
  DateTimeSchema,
  PaginationQuerySchema,
  paginatedOf,
  CommonErrors
} from './common';
import { CartSchema } from './cart';

export const OrderStatusSchema = z.enum(['created', 'paid', 'assembling', 'delivering', 'delivered', 'cancelled']);
export type TOrderStatus = z.infer<typeof OrderStatusSchema>;

export const PaymentStatusSchema = z.enum(['pending', 'succeeded', 'failed', 'refunded']);
export type TPaymentStatus = z.infer<typeof PaymentStatusSchema>;

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

export type TOrderAddress = z.infer<typeof OrderAddressSchema>;

export const OrderItemSchema = z.object({
  id: z.string().uuid(),
  productId: ProductId,
  quantity: z.number().int().positive(),
  priceAtPurchase: z.number().int().positive(),
  productNameSnapshot: z.string(),
  productSkuSnapshot: z.string()
});

export type TOrderItem = z.infer<typeof OrderItemSchema>;

export const OrderSchema = z.object({
  id: OrderId,
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

export type TOrder = z.infer<typeof OrderSchema>;

export const CreateOrderBodySchema = z.object({
  addressId: AddressId,
  userComment: z.string().max(500).optional()
});

export type TCreateOrderBody = z.infer<typeof CreateOrderBodySchema>;

const OrderParamsSchema = z.object({ id: OrderId });

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
