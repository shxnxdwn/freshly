import { pgTable, serial, uuid, integer, varchar, timestamp, index, check, uniqueIndex } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';
import { products } from './products';

export const reviews = pgTable(
  'reviews',
  {
    id: serial('id').primaryKey(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'restrict' })
      .notNull(),
    productId: integer('product_id')
      .references(() => products.id, { onDelete: 'restrict' })
      .notNull(),
    rating: integer('rating').notNull(),
    comment: varchar('comment', { length: 300 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => sql`now()`)
      .notNull()
  },
  (table) => [
    index('reviews_product_idx').on(table.productId),
    check('rating_range', sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
    uniqueIndex('reviews_user_product_uniq_idx').on(table.userId, table.productId)
  ]
);

export type TSelectReview = typeof reviews.$inferSelect;
export type TInsertReview = typeof reviews.$inferInsert;
