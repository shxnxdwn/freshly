import { z } from 'zod';
import { c } from './contract';
import {
  ChatIdSchema,
  OrderIdSchema,
  MessageIdSchema,
  DateTimeSchema,
  PaginationQuerySchema,
  paginatedOf,
  CommonErrors
} from './common';

export const ChatRoleSchema = z.enum(['client', 'support']);
export type ChatRole = z.infer<typeof ChatRoleSchema>;

export const MessageSchema = z.object({
  id: MessageIdSchema,
  chatId: ChatIdSchema,
  senderType: ChatRoleSchema,
  messageText: z.string().min(1).max(2000).nullable(),
  orderId: OrderIdSchema.nullable(),
  attachments: z.array(z.string().url()).nullable(),
  isRead: z.boolean(),
  createdAt: DateTimeSchema
});

export type Message = z.infer<typeof MessageSchema>;

export const ChatSchema = z.object({
  id: ChatIdSchema,
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema
});

export type Chat = z.infer<typeof ChatSchema>;

export const supportContract = c.router({
  getChat: {
    method: 'GET',
    path: '/support/chat',
    responses: {
      200: ChatSchema,
      ...CommonErrors
    },
    summary: 'Get or create support chat for current user'
  },
  getMessages: {
    method: 'GET',
    path: '/support/chat/messages',
    query: PaginationQuerySchema,
    responses: {
      200: paginatedOf(MessageSchema),
      ...CommonErrors
    },
    summary: 'Get chat message history'
  }
});
