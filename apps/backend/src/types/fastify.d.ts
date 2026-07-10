import 'fastify';
import '@fastify/jwt';
import type { AccessJwtPayload, RefreshJwtPayload } from '../plugins/jwt.plugin';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: AccessJwtPayload;
    user: AccessJwtPayload;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    verifyAccessJwt(): Promise<AccessJwtPayload>;
    verifyRefreshJwt(options?: { onlyCookie?: boolean }): Promise<RefreshJwtPayload>;
  }
  interface FastifyReply {
    signAccessJwt(payload: AccessJwtPayload): Promise<string>;
    signRefreshJwt(payload: RefreshJwtPayload): Promise<string>;
  }
  interface FastifyInstance {
    authenticate: (request: FastifyRequest) => Promise<void>;
    authenticateAdmin: (request: FastifyRequest) => Promise<void>;
  }
}
