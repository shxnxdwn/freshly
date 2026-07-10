import { and, desc, eq, sql } from 'drizzle-orm';
import { addresses, DrizzleClient } from '@freshly/db';
import type { AddressId, CreateAddressBody, UpdateAddressBody, UserId } from '@freshly/contracts';

export const addressRepository = {
  async findAllByUserId(userId: UserId) {
    return DrizzleClient.select()
      .from(addresses)
      .where(eq(addresses.userId, userId))
      .orderBy(desc(addresses.isDefault));
  },

  async create(userId: UserId, data: CreateAddressBody) {
    return DrizzleClient.transaction(async (tx) => {
      const [{ count }] = await tx
        .select({ count: sql<number>`count(*)::int` })
        .from(addresses)
        .where(eq(addresses.userId, userId));

      const isFirstAddress = count === 0;
      const isDefault = isFirstAddress || data.isDefault;

      if (isDefault) {
        await tx
          .update(addresses)
          .set({ isDefault: false })
          .where(and(eq(addresses.userId, userId), eq(addresses.isDefault, true)));
      }

      const [row] = await tx
        .insert(addresses)
        .values({ ...data, userId, isDefault })
        .returning();

      return row;
    });
  },

  async update(id: AddressId, userId: UserId, data: UpdateAddressBody) {
    return DrizzleClient.transaction(async (tx) => {
      if (data.isDefault === true) {
        await tx
          .update(addresses)
          .set({ isDefault: false })
          .where(and(eq(addresses.userId, userId), eq(addresses.isDefault, true)));
      }

      const [row] = await tx
        .update(addresses)
        .set(data)
        .where(and(eq(addresses.id, id), eq(addresses.userId, userId)))
        .returning();

      return row ?? null;
    });
  },

  async delete(id: AddressId, userId: UserId) {
    return DrizzleClient.transaction(async (tx) => {
      const [deleted] = await tx
        .delete(addresses)
        .where(and(eq(addresses.id, id), eq(addresses.userId, userId)))
        .returning();

      if (!deleted) return null;

      if (deleted.isDefault) {
        const [remaining] = await tx
          .select({ id: addresses.id })
          .from(addresses)
          .where(eq(addresses.userId, userId))
          .limit(1);

        if (remaining) {
          await tx.update(addresses).set({ isDefault: true }).where(eq(addresses.id, remaining.id));
        }
      }

      return deleted;
    });
  }
};
