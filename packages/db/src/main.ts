import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as enums from './schema/enums';
import * as users from './schema/users';
import * as refreshTokens from './schema/refresh-tokens';
import * as addresses from './schema/addresses';
import * as categories from './schema/categories';
import * as products from './schema/products';
import * as reviews from './schema/reviews';
import * as orders from './schema/orders';
import * as orderItems from './schema/order-items';
import * as payments from './schema/payments';
import * as chats from './schema/chats';
import * as chatMessages from './schema/chat-messages';
import * as relations from './schema/relations';

const schema = {
  ...enums,
  ...users,
  ...refreshTokens,
  ...addresses,
  ...categories,
  ...products,
  ...reviews,
  ...orders,
  ...orderItems,
  ...payments,
  ...chats,
  ...chatMessages,
  ...relations
};

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });

export const DrizzleClient = drizzle(client, { schema });
export type DrizzleClient = PostgresJsDatabase<typeof schema>;

export * from './schema/enums';
export * from './schema/users';
export * from './schema/refresh-tokens';
export * from './schema/addresses';
export * from './schema/categories';
export * from './schema/products';
export * from './schema/reviews';
export * from './schema/orders';
export * from './schema/order-items';
export * from './schema/payments';
export * from './schema/chats';
export * from './schema/chat-messages';
export * from './schema/relations';
