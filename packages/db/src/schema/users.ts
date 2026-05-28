import { pgTable, text, varchar, timestamp, pgEnum, uuid } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['admin', 'user']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 20 }).notNull(),
  avatar: text('avatar').notNull().default('cat.png'),
  roles: userRoleEnum('roles').array().notNull().default(['user']),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export type TSelectUser = typeof users.$inferSelect;
export type TInsertUser = typeof users.$inferInsert;
