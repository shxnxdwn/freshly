import { randomBytes } from 'node:crypto';
import { and, eq, isNull } from 'drizzle-orm';
import { DrizzleClient, users } from '@freshly/db';
import type { Avatar, UserId } from '@freshly/contracts';

export type UpdateUserInput = {
  name?: string;
  avatar?: Avatar;
};

export const userRepository = {
  async findById(id: UserId) {
    const [row] = await DrizzleClient.select()
      .from(users)
      .where(and(eq(users.id, id), isNull(users.deletedAt)));
    return row ?? null;
  },

  async updateById(id: UserId, data: UpdateUserInput) {
    const [row] = await DrizzleClient.update(users).set(data).where(eq(users.id, id)).returning();
    return row ?? null;
  },

  async deleteById(id: UserId): Promise<void> {
    await DrizzleClient.update(users)
      .set({
        name: 'Anonymous User',
        email: `deleted-${id}@deleted.invalid`,
        passwordHash: randomBytes(32).toString('hex'),
        deletedAt: new Date()
      })
      .where(eq(users.id, id));
  }
};
