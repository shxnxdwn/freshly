import { and, desc, eq, sql } from 'drizzle-orm';
import type { ProductId, ReviewId, UserId } from '@freshly/contracts';
import { DrizzleClient, orderItems, orders, products, reviews } from '@freshly/db';

type Tx = Parameters<Parameters<typeof DrizzleClient.transaction>[0]>[0];

const isUniqueViolation = (error: unknown): boolean =>
  typeof error === 'object' && error !== null && 'code' in error && error.code === '23505';

const recalculateProductRating = async (tx: Tx, productId: ProductId) => {
  const [{ avgRating, reviewCount }] = await tx
    .select({
      avgRating: sql<string | null>`avg(${reviews.rating})`,
      reviewCount: sql<number>`count(*)::int`
    })
    .from(reviews)
    .where(eq(reviews.productId, productId));

  await tx
    .update(products)
    .set({
      rating: avgRating ? Number(avgRating) : 0,
      reviewCount
    })
    .where(eq(products.id, productId));
};

export const reviewRepository = {
  async findByProductId(productId: ProductId, limit: number, offset: number) {
    return DrizzleClient.select()
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .orderBy(desc(reviews.createdAt))
      .limit(limit)
      .offset(offset);
  },

  async countByProductId(productId: ProductId) {
    const [{ count }] = await DrizzleClient.select({ count: sql<number>`count(*)::int` })
      .from(reviews)
      .where(eq(reviews.productId, productId));

    return count;
  },

  async findById(reviewId: ReviewId) {
    const [row] = await DrizzleClient.select().from(reviews).where(eq(reviews.id, reviewId));
    return row ?? null;
  },

  async hasPurchased(userId: UserId, productId: ProductId): Promise<boolean> {
    const [row] = await DrizzleClient.select({ id: orderItems.id })
      .from(orderItems)
      .innerJoin(orders, eq(orders.id, orderItems.orderId))
      .where(and(eq(orders.userId, userId), eq(orderItems.productId, productId), eq(orders.status, 'delivered')))
      .limit(1);

    return Boolean(row);
  },

  async create(userId: UserId, productId: ProductId, rating: number, comment: string | null) {
    try {
      return await DrizzleClient.transaction(async (tx) => {
        const [review] = await tx.insert(reviews).values({ userId, productId, rating, comment }).returning();

        await recalculateProductRating(tx, productId);

        return review;
      });
    } catch (error) {
      if (isUniqueViolation(error)) return null;
      throw error;
    }
  },

  async update(reviewId: ReviewId, productId: ProductId, rating: number, comment: string | null) {
    return DrizzleClient.transaction(async (tx) => {
      const [review] = await tx.update(reviews).set({ rating, comment }).where(eq(reviews.id, reviewId)).returning();

      if (review) {
        await recalculateProductRating(tx, productId);
      }

      return review ?? null;
    });
  },

  async delete(reviewId: ReviewId, productId: ProductId) {
    await DrizzleClient.transaction(async (tx) => {
      await tx.delete(reviews).where(eq(reviews.id, reviewId));
      await recalculateProductRating(tx, productId);
    });
  }
};
