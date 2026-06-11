import { pgTable, uuid, text, boolean, timestamp, index } from 'drizzle-orm/pg-core';
import { chatRoleEnum } from './enums';
import { chats } from './chats';
import { orders } from './orders';

export const chatMessages = pgTable(
  'chat_messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    chatId: uuid('chat_id')
      .references(() => chats.id, { onDelete: 'cascade' })
      .notNull(),
    senderType: chatRoleEnum('sender_type').notNull(),
    messageText: text('message_text'),
    orderId: uuid('order_id').references(() => orders.id, { onDelete: 'set null' }),
    attachments: text('attachments').array(),
    isRead: boolean('is_read').default(false).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
  },
  (table) => [
    index('chat_messages_chat_idx').on(table.chatId),
    index('chat_messages_created_idx').on(table.createdAt),
    index('chat_messages_order_idx').on(table.orderId)
  ]
);

export type SelectChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;
