import { z } from 'zod';
import { OrderIdSchema, ChatIdSchema, DateTimeSchema } from './common';
import { OrderStatusSchema, PaymentStatusSchema } from './order';
import { MessageSchema } from './support';

export const WsClientEvent = {
  SUBSCRIBE_ORDER: 'subscribe:order',
  UNSUBSCRIBE_ORDER: 'unsubscribe:order',
  JOIN_CHAT: 'join:chat',
  LEAVE_CHAT: 'leave:chat'
} as const;

export const WsServerEvent = {
  ORDER_UPDATED: 'order:updated',
  CHAT_MESSAGE_RECEIVED: 'chat:message_received',
  ERROR: 'error'
} as const;

export const WsSubscribeOrderSchema = z.object({
  orderId: OrderIdSchema
});

export type WsSubscribeOrder = z.infer<typeof WsSubscribeOrderSchema>;

export const WsJoinChatSchema = z.object({
  chatId: ChatIdSchema
});

export type WsJoinChat = z.infer<typeof WsJoinChatSchema>;

export const WsOrderUpdatedSchema = z.object({
  orderId: OrderIdSchema,
  status: OrderStatusSchema,
  paymentStatus: PaymentStatusSchema,
  estimatedDeliveryAt: DateTimeSchema.nullable(),
  updatedAt: DateTimeSchema
});

export type WsOrderUpdated = z.infer<typeof WsOrderUpdatedSchema>;

export const WsChatMessageReceivedSchema = MessageSchema;
export type WsChatMessageReceived = z.infer<typeof WsChatMessageReceivedSchema>;

export const WsErrorSchema = z.object({
  code: z.string(),
  message: z.string()
});

export type WsError = z.infer<typeof WsErrorSchema>;
