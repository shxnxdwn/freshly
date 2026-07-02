import { pgTable, uuid, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const chats = pgTable(
  'chats',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'restrict' })
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => sql`now()`)
      .notNull()
  },
  (table) => [index('chats_user_idx').on(table.userId), index('chats_updated_idx').on(table.updatedAt)]
);

export type SelectChat = typeof chats.$inferSelect;
export type InsertChat = typeof chats.$inferInsert;
