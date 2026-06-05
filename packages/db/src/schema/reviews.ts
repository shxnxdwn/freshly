import { pgTable, serial, uuid, integer, varchar, timestamp, index, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';
import { products } from './products';

export const reviews = pgTable(
  'reviews',
  {
    id: serial('id').primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    productId: integer('product_id')
      .references(() => products.id, { onDelete: 'cascade' })
      .notNull(),
    rating: integer('rating').notNull(),
    comment: varchar('comment', { length: 300 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
  },
  (table) => [
    index('reviews_product_idx').on(table.productId),
    index('reviews_user_idx').on(table.userId),
    check('rating_range', sql`${table.rating} >= 1 AND ${table.rating} <= 5`)
  ]
);
