import 'fastify';
import '@fastify/jwt';
import type { JwtPayload } from '../plugins/jwt.plugin';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtPayload;
    user: JwtPayload;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    verifyAccessJwt(): Promise<JwtPayload>;
    verifyRefreshJwt(): Promise<JwtPayload>;
  }
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>;
    authenticateAdmin: (request: FastifyRequest) => Promise<void>;
  }
}
