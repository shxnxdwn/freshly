import { z } from 'zod';
import { c } from './contract';
import {
    OrderId, AddressId, ProductId,
    DateTimeSchema, PaginationQuerySchema, paginatedOf, CommonErrors,
} from './common';

export const OrderStatusSchema = z.enum([
    'pending',
    'confirmed',
    'delivering',
    'delivered',
    'cancelled',
]);

export type TOrderStatus = z.infer<typeof OrderStatusSchema>;

export const PaymentStatusSchema = z.enum(['pending', 'paid', 'failed', 'refunded']);
export type TPaymentStatus = z.infer<typeof PaymentStatusSchema>;

export const OrderItemSchema = z.object({
    productId: ProductId,
    name: z.string(),
    image: z.string().url(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
});

export type TOrderItem = z.infer<typeof OrderItemSchema>;

export const OrderAddressSchema = z.object({
    city: z.string(),
    street: z.string(),
    apartment: z.string().optional(),
    zip: z.string(),
});

export type TOrderAddress = z.infer<typeof OrderAddressSchema>;

export const OrderSchema = z.object({
    id: OrderId,
    items: z.array(OrderItemSchema),
    address: OrderAddressSchema,
    status: OrderStatusSchema,
    paymentStatus: PaymentStatusSchema,
    total: z.number().positive(),
    createdAt: DateTimeSchema,
});
export type TOrder = z.infer<typeof OrderSchema>;

export const CreateOrderBodySchema = z.object({
    addressId: AddressId,
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
            ...CommonErrors,
        },
        summary: 'Get user orders',
    },
    getOrder: {
        method: 'GET',
        path: '/orders/:id',
        pathParams: OrderParamsSchema,
        responses: {
            200: OrderSchema,
            ...CommonErrors,
        },
        summary: 'Get order by id',
    },
    createOrder: {
        method: 'POST',
        path: '/orders',
        body: CreateOrderBodySchema,
        responses: {
            201: OrderSchema,
            ...CommonErrors,
        },
        summary: 'Create order from cart',
    },
    cancelOrder: {
        method: 'POST',
        path: '/orders/:id/cancel',
        pathParams: OrderParamsSchema,
        body: z.object({}),
        responses: {
            200: OrderSchema,
            ...CommonErrors,
        },
        summary: 'Cancel order',
    },
});
