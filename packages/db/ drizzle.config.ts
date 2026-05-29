import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env' });

export default defineConfig({
  schema: './src/schema',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DIRECT_URL!
  }
});
