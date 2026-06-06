import { z } from 'zod';
import { c } from './contract';
import { ChatId, OrderId, MessageId, DateTimeSchema, PaginationQuerySchema, paginatedOf, CommonErrors } from './common';

export const ChatRoleSchema = z.enum(['client', 'support']);
export type TChatRole = z.infer<typeof ChatRoleSchema>;

export const MessageSchema = z.object({
  id: MessageId,
  chatId: ChatId,
  senderType: ChatRoleSchema,
  messageText: z.string().min(1).max(2000).nullable(),
  orderId: OrderId.nullable(),
  attachments: z.array(z.string().url()).nullable(),
  isRead: z.boolean(),
  createdAt: DateTimeSchema
});

export type TMessage = z.infer<typeof MessageSchema>;

export const ChatSchema = z.object({
  id: ChatId,
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema
});

export type TChat = z.infer<typeof ChatSchema>;

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
