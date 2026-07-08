import fp from 'fastify-plugin';
import websocket from '@fastify/websocket';
import type { FastifyInstance } from 'fastify';
import { env } from '../config/env';
import { ErrorCodes } from '@freshly/contracts';

const MAX_PAYLOAD = 1024 * 1024;

export const websocketPlugin = fp(async (app: FastifyInstance) => {
  await app.register(websocket, {
    options: {
      maxPayload: MAX_PAYLOAD
    }
  });

  app.addHook('onRequest', async (request, reply) => {
    if (request.headers.upgrade?.toLowerCase() === 'websocket') {
      const origin = request.headers.origin;

      if (origin !== env.FRONTEND_URL) {
        return reply.status(401).send({
          code: ErrorCodes.UNAUTHORIZED,
          message: 'Unauthorized origin'
        });
      }
    }
  });
});
