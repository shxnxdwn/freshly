import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const schema = {

};

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString, { prepare: false });

export const DrizzleClient = drizzle(client, { schema });
export type TDrizzleClient = PostgresJsDatabase<typeof schema>;
