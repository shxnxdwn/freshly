import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['admin', 'client']);

export const chatRoleEnum = pgEnum('chat_role', ['client', 'support']);

export const orderStatusEnum = pgEnum('order_status', [
  'created',
  'paid',
  'assembling',
  'delivering',
  'delivered',
  'cancelled'
]);

export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'succeeded', 'failed', 'refunded']);
