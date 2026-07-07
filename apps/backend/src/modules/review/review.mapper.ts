import type { Review } from '@freshly/contracts';
import type { SelectReview } from '@freshly/db';

export const toReview = (row: SelectReview): Review => ({
  id: row.id as Review['id'],
  productId: row.productId as Review['productId'],
  userId: row.userId as Review['userId'],
  rating: row.rating,
  comment: row.comment,
  createdAt: row.createdAt.toISOString(),
  updatedAt: row.updatedAt.toISOString()
});
