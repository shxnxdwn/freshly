import { createHash } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { DrizzleClient, refreshTokens } from '@freshly/db';
import type { UserId } from '@freshly/contracts';

const hashToken = (token: string): string => createHash('sha256').update(token).digest('hex');

export const authRepository = {
  async create(userId: UserId, token: string, expiresAt: Date): Promise<void> {
    await DrizzleClient.insert(refreshTokens).values({
      userId,
      token: hashToken(token),
      expiresAt
    });
  },

  async findByToken(token: string) {
    const [row] = await DrizzleClient.select()
      .from(refreshTokens)
      .where(eq(refreshTokens.token, hashToken(token)));
    return row ?? null;
  },

  async rotate(oldToken: string, userId: UserId, newToken: string, newExpiresAt: Date): Promise<void> {
    await DrizzleClient.transaction(async (tx) => {
      await tx.delete(refreshTokens).where(eq(refreshTokens.token, hashToken(oldToken)));
      await tx.insert(refreshTokens).values({
        userId,
        token: hashToken(newToken),
        expiresAt: newExpiresAt
      });
    });
  },

  async deleteByToken(token: string): Promise<void> {
    await DrizzleClient.delete(refreshTokens).where(eq(refreshTokens.token, hashToken(token)));
  },

  async deleteAllForUser(userId: UserId): Promise<void> {
    await DrizzleClient.delete(refreshTokens).where(eq(refreshTokens.userId, userId));
  }
};
