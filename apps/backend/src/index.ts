import 'dotenv/config';
import { env } from './config/env';
import { buildServer } from './server';

const start = async () => {
  const app = await buildServer();

  try {
    await app.listen({ port: env.PORT, host: env.HOST });
    app.log.info(`Server started on port ${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

void start();
