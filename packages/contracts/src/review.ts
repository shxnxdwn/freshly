import { z } from 'zod';
import { c } from './contract';
import {
  ReviewIdSchema,
  UserIdSchema,
  ProductIdSchema,
  SlugSchema,
  DateTimeSchema,
  PaginationQuerySchema,
  paginatedOf,
  CommonErrors
} from './common';

export const ReviewSchema = z.object({
  id: ReviewIdSchema,
  productId: ProductIdSchema,
  userId: UserIdSchema,
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5).max(300).nullable(),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema
});

export type Review = z.infer<typeof ReviewSchema>;

export const CreateReviewBodySchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5).max(300).optional()
});

export type CreateReviewBody = z.infer<typeof CreateReviewBodySchema>;

export const reviewContract = c.router({
  getReviews: {
    method: 'GET',
    path: '/products/:slug/reviews',
    pathParams: z.object({ slug: SlugSchema }),
    query: PaginationQuerySchema,
    responses: {
      200: paginatedOf(ReviewSchema),
      ...CommonErrors
    },
    summary: 'Get product reviews'
  },
  createReview: {
    method: 'POST',
    path: '/products/:slug/reviews',
    pathParams: z.object({ slug: SlugSchema }),
    body: CreateReviewBodySchema,
    responses: {
      201: ReviewSchema,
      ...CommonErrors
    },
    summary: 'Create review'
  },
  deleteReview: {
    method: 'DELETE',
    path: '/products/:slug/reviews/:reviewId',
    pathParams: z.object({ slug: SlugSchema, reviewId: ReviewIdSchema }),
    body: z.object({}),
    responses: {
      200: z.object({ success: z.literal(true) }),
      ...CommonErrors
    },
    summary: 'Delete review'
  }
});
