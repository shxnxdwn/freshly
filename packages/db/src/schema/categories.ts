import { pgTable, serial, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  imageUrl: text('image_url'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
});
