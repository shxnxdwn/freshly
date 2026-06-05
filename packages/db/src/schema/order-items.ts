import { index, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { products } from './products';
import { orders } from './orders';

export const orderItems = pgTable(
  'order_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .references(() => orders.id, { onDelete: 'cascade' })
      .notNull(),
    productId: integer('product_id')
      .references(() => products.id, { onDelete: 'restrict' })
      .notNull(),
    quantity: integer('quantity').notNull(),
    priceAtPurchase: integer('price_at_purchase').notNull(),
    productNameSnapshot: varchar('product_name_snapshot', { length: 255 }).notNull(),
    productSkuSnapshot: varchar('product_sku_snapshot', { length: 300 }).notNull()
  },
  (table) => [index('order_items_order_idx').on(table.orderId), index('order_items_product_idx').on(table.productId)]
);

export type TSelectOrderItem = typeof orderItems.$inferSelect;
export type TInsertOrderItem = typeof orderItems.$inferInsert;
