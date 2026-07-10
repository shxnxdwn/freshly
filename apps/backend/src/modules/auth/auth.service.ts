import bcrypt from 'bcrypt';
import { z } from 'zod';
import {
  type AuthResponse,
  ErrorCodes,
  type LoginBody,
  type RefreshResponse,
  type RegisterBody,
  type UserId,
  UserIdSchema
} from '@freshly/contracts';
import { toUser } from '../user/user.mapper';
import { authRepository } from './auth.repository';
import { env } from '../../config/env';
import { ConflictError, UnauthorizedError } from '../../errors/app-error';
import { userRepository } from '../user';

export type AuthReply = {
  signAccessJwt(payload: { userId: UserId; role: string }): Promise<string>;
  signRefreshJwt(payload: { userId: UserId }): Promise<string>;
  setCookie(name: string, value: string, options?: Record<string, unknown>): unknown;
  clearCookie(name: string, options?: Record<string, unknown>): unknown;
};

export type AuthRequest = {
  cookies: Record<string, string | undefined>;
  verifyRefreshJwt(options?: { onlyCookie?: boolean }): Promise<unknown>;
};

const BCRYPT_ROUNDS = 12;
const REFRESH_COOKIE_NAME = 'refreshToken';

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/auth'
};

const refreshPayloadSchema = z.object({ userId: UserIdSchema });

export class AuthService {
  public async register(reply: AuthReply, body: RegisterBody): Promise<AuthResponse> {
    const existing = await userRepository.findByEmail(body.email);

    if (existing) {
      throw new ConflictError('Email already registered', ErrorCodes.EMAIL_ALREADY_EXISTS);
    }

    const passwordHash = await bcrypt.hash(body.password, BCRYPT_ROUNDS);
    const row = await userRepository.create({ email: body.email, name: body.name, passwordHash });
    const accessToken = await this.issueSession(reply, row.id as UserId, row.role);

    return { accessToken, expiresIn: env.JWT_ACCESS_EXPIRES_IN, user: toUser(row) };
  }

  public async login(reply: AuthReply, body: LoginBody): Promise<AuthResponse> {
    const row = await userRepository.findByEmail(body.email);

    if (!row) {
      throw new UnauthorizedError('Invalid email or password', ErrorCodes.INVALID_CREDENTIALS);
    }

    const passwordMatches = await bcrypt.compare(body.password, row.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedError('Invalid email or password', ErrorCodes.INVALID_CREDENTIALS);
    }

    const accessToken = await this.issueSession(reply, row.id as UserId, row.role);

    return { accessToken, expiresIn: env.JWT_ACCESS_EXPIRES_IN, user: toUser(row) };
  }

  public async refresh(request: AuthRequest, reply: AuthReply): Promise<RefreshResponse> {
    const oldToken = request.cookies[REFRESH_COOKIE_NAME];

    if (!oldToken) {
      throw new UnauthorizedError('Refresh token missing', ErrorCodes.INVALID_REFRESH_TOKEN);
    }

    let decoded: unknown;

    try {
      decoded = await request.verifyRefreshJwt({ onlyCookie: true });
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token', ErrorCodes.INVALID_REFRESH_TOKEN);
    }

    const parsed = refreshPayloadSchema.safeParse(decoded);

    if (!parsed.success) {
      throw new UnauthorizedError('Invalid refresh token payload', ErrorCodes.INVALID_REFRESH_TOKEN);
    }

    const existing = await authRepository.findByToken(oldToken);

    if (!existing) {
      throw new UnauthorizedError('Refresh token already used or revoked', ErrorCodes.INVALID_REFRESH_TOKEN);
    }

    const user = await userRepository.findById(parsed.data.userId);

    if (!user) {
      throw new UnauthorizedError('User not found', ErrorCodes.INVALID_REFRESH_TOKEN);
    }

    const accessToken = await reply.signAccessJwt({ userId: user.id as UserId, role: user.role });
    const newRefreshToken = await reply.signRefreshJwt({ userId: user.id as UserId });
    const expiresAt = new Date(Date.now() + env.JWT_REFRESH_EXPIRES_IN);

    await authRepository.rotate(oldToken, user.id as UserId, newRefreshToken, expiresAt);

    reply.setCookie(REFRESH_COOKIE_NAME, newRefreshToken, {
      ...REFRESH_COOKIE_OPTIONS,
      maxAge: env.JWT_REFRESH_EXPIRES_IN / 1000
    });

    return { accessToken, expiresIn: env.JWT_ACCESS_EXPIRES_IN };
  }

  public async logout(request: AuthRequest, reply: AuthReply): Promise<void> {
    const token = request.cookies[REFRESH_COOKIE_NAME];

    if (token) {
      await authRepository.deleteByToken(token);
    }

    reply.clearCookie(REFRESH_COOKIE_NAME, { path: '/auth' });
  }

  private async issueSession(reply: AuthReply, userId: UserId, role: string): Promise<string> {
    const accessToken = await reply.signAccessJwt({ userId, role });
    const refreshToken = await reply.signRefreshJwt({ userId });
    const expiresAt = new Date(Date.now() + env.JWT_REFRESH_EXPIRES_IN);

    await authRepository.create(userId, refreshToken, expiresAt);

    reply.setCookie(REFRESH_COOKIE_NAME, refreshToken, {
      ...REFRESH_COOKIE_OPTIONS,
      maxAge: env.JWT_REFRESH_EXPIRES_IN / 1000
    });

    return accessToken;
  }
}

export const authService = new AuthService();
