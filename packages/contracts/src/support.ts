import { z } from 'zod';
import { c } from './contract';
import { MessageId, DateTimeSchema, PaginationQuerySchema, paginatedOf, CommonErrors } from './common';

export const MessageSchema = z.object({
    id: MessageId,
    text: z.string().min(1).max(1000),
    createdAt: DateTimeSchema,
    isFromSupport: z.boolean(),
});

export type TMessage = z.infer<typeof MessageSchema>;

export const SendMessageBodySchema = z.object({
    text: z.string().min(1).max(1000),
});

export type TSendMessageBody = z.infer<typeof SendMessageBodySchema>;

export const supportContract = c.router({
    getMessages: {
        method: 'GET',
        path: '/support/messages',
        query: PaginationQuerySchema,
        responses: {
            200: paginatedOf(MessageSchema),
            ...CommonErrors,
        },
        summary: 'Get support messages',
    },
    sendMessage: {
        method: 'POST',
        path: '/support/messages',
        body: SendMessageBodySchema,
        responses: {
            201: MessageSchema,
            ...CommonErrors,
        },
        summary: 'Send support message',
    },
});
