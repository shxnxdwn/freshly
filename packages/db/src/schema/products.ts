import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  index,
  numeric,
  check
} from 'drizzle-orm/pg-core';
import { categories } from './categories';
import { sql } from 'drizzle-orm';

export const products = pgTable(
  'products',
  {
    id: serial('id').primaryKey(),
    categoryId: integer('category_id')
      .references(() => categories.id, { onDelete: 'restrict' })
      .notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description'),
    price: integer('price').notNull(),
    salePrice: integer('sale_price'),
    stock: integer('stock').default(0).notNull(),
    imageUrls: text('image_urls').array().notNull(),
    rating: numeric('rating', { precision: 3, scale: 2 }).default('0.00').notNull(),
    reviewCount: integer('review_count').default(0).notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => sql`now()`)
      .notNull()
  },
  (table) => [
    index('product_category_idx').on(table.categoryId),
    check('min_one_image', sql`cardinality(${table.imageUrls}) >= 1`)
  ]
);
