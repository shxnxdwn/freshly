import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { z } from 'zod';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { env } from '../config/env';
import { type UserId, UserIdSchema, UserRole, UserRoleSchema } from '@freshly/contracts';
import { ForbiddenError, UnauthorizedError } from '../errors/app-error';

const accessJwtPayloadSchema = z.object({
  userId: UserIdSchema,
  role: UserRoleSchema
});

export type AccessJwtPayload = z.infer<typeof accessJwtPayloadSchema>;
export type RefreshJwtPayload = { userId: UserId };

export const jwtPlugin = fp(async (app: FastifyInstance) => {
  await app.register(jwt, {
    secret: env.JWT_ACCESS_SECRET,
    namespace: 'access',
    jwtVerify: 'verifyAccessJwt',
    jwtSign: 'signAccessJwt',
    sign: { expiresIn: `${env.JWT_ACCESS_EXPIRES_IN}ms` }
  });

  await app.register(jwt, {
    secret: env.JWT_REFRESH_SECRET,
    namespace: 'refresh',
    jwtVerify: 'verifyRefreshJwt',
    jwtSign: 'signRefreshJwt',
    sign: { expiresIn: `${env.JWT_REFRESH_EXPIRES_IN}ms` },
    cookie: {
      cookieName: 'refreshToken',
      signed: false
    }
  });

  app.decorate('authenticate', async (request: FastifyRequest) => {
    let decoded: unknown;

    try {
      decoded = await request.verifyAccessJwt();
    } catch {
      throw new UnauthorizedError('Invalid or expired access token');
    }

    const parsed = accessJwtPayloadSchema.safeParse(decoded);

    if (!parsed.success) {
      throw new UnauthorizedError('Invalid token payload structure');
    }

    request.user = parsed.data;
  });

  app.decorate('authenticateAdmin', async (request: FastifyRequest) => {
    await app.authenticate(request);

    if (request.user.role !== UserRole.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }
  });
});
