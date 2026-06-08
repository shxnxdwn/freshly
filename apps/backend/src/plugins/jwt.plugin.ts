import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { z } from 'zod';
import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { env } from '../config/env';
import { UserRoleSchema } from '@freshly/contracts';

const jwtPayloadSchema = z.object({
  userId: z.string().uuid(),
  role: UserRoleSchema
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

export const jwtPlugin = fp(async (app: FastifyInstance) => {
  await app.register(jwt, {
    secret: env.JWT_ACCESS_SECRET,
    namespace: 'access',
    jwtVerify: 'verifyAccessJwt',
    jwtSign: 'signAccessJwt',
    sign: { expiresIn: env.JWT_ACCESS_EXPIRES_IN }
  });

  await app.register(jwt, {
    secret: env.JWT_REFRESH_SECRET,
    namespace: 'refresh',
    jwtVerify: 'verifyRefreshJwt',
    jwtSign: 'signRefreshJwt',
    sign: { expiresIn: env.JWT_REFRESH_EXPIRES_IN },
    cookie: {
      cookieName: 'refreshToken',
      signed: false
    }
  });

  app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const decoded = await request.verifyAccessJwt();

      const parsed = jwtPayloadSchema.safeParse(decoded);
      if (!parsed.success) {
        return reply.status(401).send({
          code: 'UNAUTHORIZED',
          message: 'Invalid token payload structure'
        });
      }

      request.user = parsed.data;
    } catch {
      return reply.status(401).send({
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired access token'
      });
    }
  });

  app.decorate('authenticateAdmin', async (request: FastifyRequest, reply: FastifyReply) => {
    await app.authenticate(request, reply);
    if (reply.sent) return;

    if (request.user.role !== 'admin') {
      return reply.status(403).send({
        code: 'FORBIDDEN',
        message: 'Admin access required'
      });
    }
  });
});
