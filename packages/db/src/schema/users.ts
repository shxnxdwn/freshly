import { pgTable, text, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';
import { userRoleEnum } from './enums';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: varchar('name', { length: 20 }).notNull(),
  avatar: varchar('avatar').notNull().default('cat.png'),
  role: userRoleEnum('user_role').default('client').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export type TSelectUser = typeof users.$inferSelect;
export type TInsertUser = typeof users.$inferInsert;
