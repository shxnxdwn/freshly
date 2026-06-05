import { pgTable, text, varchar, timestamp, uuid, uniqueIndex } from 'drizzle-orm/pg-core';
import { userRoleEnum } from './enums';
import { sql } from 'drizzle-orm';

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordHash: text('password_hash'),
    avatar: varchar('avatar').notNull().default('cat.png'),
    role: userRoleEnum('user_role').default('client').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => sql`now()`)
      .notNull(),

    deletedAt: timestamp('deleted_at', { withTimezone: true })
  },
  (table) => [
    uniqueIndex('users_email_unique_idx')
      .on(table.email)
      .where(sql`deleted_at IS NULL`)
  ]
);

export type TSelectUser = typeof users.$inferSelect;
export type TInsertUser = typeof users.$inferInsert;
