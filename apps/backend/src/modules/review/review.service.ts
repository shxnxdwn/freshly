import type {
  CreateReviewBody,
  PaginationQuery,
  Review,
  ReviewId,
  UpdateReviewBody,
  UserId,
  UserRole
} from '@freshly/contracts';
import { reviewRepository } from './review.repository';
import { toReview } from './review.mapper';
import { productService } from '../product';
import { ConflictError, ForbiddenError, NotFoundError } from '../../errors/app-error';

export class ReviewService {
  public async getReviews(slug: string, query: PaginationQuery) {
    const product = await productService.getProductBySlug(slug);
    const { page, limit } = query;
    const offset = (page - 1) * limit;

    const [rows, total] = await Promise.all([
      reviewRepository.findByProductId(product.id, limit, offset),
      reviewRepository.countByProductId(product.id)
    ]);

    return {
      items: rows.map(toReview),
      total,
      page,
      limit,
      hasNext: offset + rows.length < total,
      hasPrev: page > 1
    };
  }

  public async createReview(userId: UserId, slug: string, body: CreateReviewBody): Promise<Review> {
    const product = await productService.getProductBySlug(slug);

    const hasPurchased = await reviewRepository.hasPurchased(userId, product.id);
    if (!hasPurchased) {
      throw new ForbiddenError('You can only review products you have received');
    }

    const review = await reviewRepository.create(userId, product.id, body.rating, body.comment ?? null);
    if (!review) throw new ConflictError('Review already exists');

    return toReview(review);
  }

  public async updateReview(userId: UserId, slug: string, reviewId: ReviewId, body: UpdateReviewBody): Promise<Review> {
    const product = await productService.getProductBySlug(slug);
    const existing = await reviewRepository.findById(reviewId);

    if (!existing || existing.productId !== product.id) {
      throw new NotFoundError('Review not found');
    }
    if (existing.userId !== userId) {
      throw new ForbiddenError('You can only edit your own review');
    }

    const updated = await reviewRepository.update(reviewId, product.id, body.rating, body.comment ?? null);
    if (!updated) throw new NotFoundError('Review not found');
    return toReview(updated);
  }

  public async deleteReview(userId: UserId, role: UserRole, slug: string, reviewId: ReviewId): Promise<void> {
    const product = await productService.getProductBySlug(slug);
    const existing = await reviewRepository.findById(reviewId);

    if (!existing || existing.productId !== product.id) {
      throw new NotFoundError('Review not found');
    }

    const isOwner = existing.userId === userId;
    const isAdmin = role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new ForbiddenError('You can only delete your own review');
    }

    await reviewRepository.delete(reviewId, product.id);
  }
}

export const reviewService = new ReviewService();
