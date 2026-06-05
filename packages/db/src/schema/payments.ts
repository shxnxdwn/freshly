import { pgTable, uuid, integer, varchar, jsonb, timestamp, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { paymentStatusEnum } from './enums';
import { orders } from './orders';
import { sql } from 'drizzle-orm';

export const payments = pgTable(
  'payments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id')
      .references(() => orders.id, { onDelete: 'restrict' })
      .notNull(),
    status: paymentStatusEnum('status').default('pending').notNull(),
    amount: integer('amount').notNull(),
    paymentMethod: varchar('payment_method', { length: 50 }).notNull(),
    providerTransactionId: varchar('provider_transaction_id', { length: 255 }),
    providerPayload: jsonb('provider_payload'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => sql`now()`)
      .notNull()
  },
  (table) => [
    index('payments_order_idx').on(table.orderId),
    index('payments_status_idx').on(table.status),
    uniqueIndex('payments_provider_tx_uniq_idx')
      .on(table.providerTransactionId)
      .where(sql`provider_transaction_id IS NOT NULL`)
  ]
);

export type TSelectPayment = typeof payments.$inferSelect;
export type TInsertPayment = typeof payments.$inferInsert;
