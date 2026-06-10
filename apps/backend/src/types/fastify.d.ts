import type { TJwtPayload } from './jwt.plugin';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: TJwtPayload;
    user: TJwtPayload;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    verifyAccessJwt(): Promise<unknown>;
    verifyRefreshJwt(): Promise<unknown>;
  }
  interface FastifyInstance {
    authenticate: (
      request: import('fastify').FastifyRequest,
      reply: import('fastify').FastifyReply
    ) => Promise<void>;

    authenticateAdmin: (
      request: import('fastify').FastifyRequest,
      reply: import('fastify').FastifyReply
    ) => Promise<void>;
  }
}

export {};
