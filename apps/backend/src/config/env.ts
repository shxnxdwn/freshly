import { z } from 'zod';

const parseEnv = () => {
  const parsedEnv = envSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    throw new Error('[Config] Invalid environment variables:');
  }

  return parsedEnv;
};

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().default('0.0.0.0'),

  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.coerce
    .number()
    .int()
    .positive()
    .default(10 * 60 * 1000),
  JWT_REFRESH_EXPIRES_IN: z.coerce
    .number()
    .int()
    .positive()
    .default(7 * 24 * 60 * 60 * 1000),

  FRONTEND_URL: z.string().url()
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = parseEnv().data;
