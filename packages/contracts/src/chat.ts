import { z } from 'zod';
import { c } from './contract';
import {
  ChatIdSchema,
  CommonErrors,
  DateTimeSchema,
  MessageIdSchema,
  OrderIdSchema,
  paginatedOf,
  PaginationQuerySchema
} from './common';

export const ChatRoleSchema = z.enum(['client', 'support']);
export type ChatRole = z.infer<typeof ChatRoleSchema>;

export const MessageSchema = z.object({
  id: MessageIdSchema,
  chatId: ChatIdSchema,
  senderType: ChatRoleSchema,
  messageText: z.string().min(1).max(2000).nullable(),
  orderId: OrderIdSchema.nullable(),
  attachmentUrl: z.string().url().nullable(),
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

export const CreateMessageBodySchema = z
  .object({
    messageText: z.string().min(1).max(2000).optional(),
    orderId: OrderIdSchema.optional(),
    attachmentUrl: z.string().url().optional()
  })
  .refine((data) => data.messageText || data.attachmentUrl, {
    message: 'Either messageText or attachmentUrl must be provided'
  });

export type CreateMessageBody = z.infer<typeof CreateMessageBodySchema>;

export const chatContract = c.router({
  getChat: {
    method: 'GET',
    path: '/chat',
    responses: {
      200: ChatSchema,
      ...CommonErrors
    },
    summary: 'Get or create support chat for current user'
  },
  getMessages: {
    method: 'GET',
    path: '/chat/messages',
    query: PaginationQuerySchema,
    responses: {
      200: paginatedOf(MessageSchema),
      ...CommonErrors
    },
    summary: 'Get chat message history'
  },
  sendMessage: {
    method: 'POST',
    path: '/chat/messages',
    body: CreateMessageBodySchema,
    responses: {
      201: MessageSchema,
      ...CommonErrors
    },
    summary: 'Send message in chat'
  }
});
