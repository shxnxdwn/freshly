import { index, integer, pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { orderStatusEnum, paymentStatusEnum } from './enums';
import { users } from './users';
import { addresses } from './addresses';
import { sql } from 'drizzle-orm';

export const orders = pgTable(
  'orders',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderNumber: serial('order_number').notNull(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'restrict' })
      .notNull(),
    addressId: uuid('address_id').references(() => addresses.id, { onDelete: 'set null' }),
    status: orderStatusEnum('status').default('created').notNull(),
    paymentStatus: paymentStatusEnum('payment_status').default('pending').notNull(),
    totalAmount: integer('total_amount').notNull(),
    estimatedDeliveryAt: timestamp('estimated_delivery_at', { withTimezone: true }),
    actualDeliveryAt: timestamp('actual_delivery_at', { withTimezone: true }),
    deliveryCity: varchar('delivery_city', { length: 100 }).notNull(),
    deliveryStreet: varchar('delivery_street', { length: 150 }).notNull(),
    deliveryHouse: varchar('delivery_house', { length: 20 }).notNull(),
    deliveryHousing: varchar('delivery_housing', { length: 20 }),
    deliveryEntrance: varchar('delivery_entrance', { length: 10 }),
    deliveryFloor: varchar('delivery_floor', { length: 10 }),
    deliveryApartment: varchar('delivery_apartment', { length: 20 }),
    deliveryIntercom: varchar('delivery_intercom', { length: 50 }),
    userComment: varchar('user_comment', { length: 500 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => sql`now()`)
      .notNull()
  },
  (table) => [
    index('orders_user_idx').on(table.userId),
    index('orders_status_idx').on(table.status),
    index('orders_address_idx').on(table.addressId)
  ]
);

export type SelectOrder = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
