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
  check,
  uniqueIndex
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
    sku: varchar('sku', { length: 300 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
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
      .notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true })
  },
  (table) => [
    index('products_category_idx').on(table.categoryId),
    check('min_one_image', sql`cardinality(${table.imageUrls}) >= 1`),
    uniqueIndex('products_slug_unique_idx').on(table.slug),
    uniqueIndex('products_sku_unique_idx').on(table.sku)
  ]
);

export type TSelectProduct = typeof products.$inferSelect;
export type TInsertProduct = typeof products.$inferInsert;
