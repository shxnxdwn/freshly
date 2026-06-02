import { pgTable, uuid, varchar, doublePrecision, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  label: varchar('label', { length: 50 }),
  value: varchar('value', { length: 255 }).notNull(),
  comment: varchar('comment', { length: 300 }),

  city: varchar('city', { length: 100 }).notNull(),
  street: varchar('street', { length: 150 }).notNull(),
  house: varchar('house', { length: 20 }).notNull(),
  housing: varchar('housing', { length: 20 }),

  entrance: varchar('entrance', { length: 10 }),
  floor: varchar('floor', { length: 10 }),
  apartment: varchar('apartment', { length: 20 }),
  intercom: varchar('intercom', { length: 50 }),

  fiasId: uuid('fias_id'),
  isDefault: boolean('is_default').default(false).notNull(),

  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude')
});
