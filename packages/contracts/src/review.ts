import { z } from 'zod';
import { c } from './contract';
import {
  CommonErrors,
  DateTimeSchema,
  paginatedOf,
  PaginationQuerySchema,
  ProductIdSchema,
  ReviewIdSchema,
  SlugSchema,
  UserIdSchema
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

export const UpdateReviewBodySchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5).max(300).optional()
});

export type UpdateReviewBody = z.infer<typeof UpdateReviewBodySchema>;

const ProductSlugParamsSchema = z.object({ slug: SlugSchema });
const ReviewParamsSchema = z.object({ slug: SlugSchema, reviewId: ReviewIdSchema });

export const reviewContract = c.router({
  getReviews: {
    method: 'GET',
    path: '/products/:slug/reviews',
    pathParams: ProductSlugParamsSchema,
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
    pathParams: ProductSlugParamsSchema,
    body: CreateReviewBodySchema,
    responses: {
      201: ReviewSchema,
      ...CommonErrors
    },
    summary: 'Create review'
  },
  updateReview: {
    method: 'PATCH',
    path: '/products/:slug/reviews/:reviewId',
    pathParams: ReviewParamsSchema,
    body: UpdateReviewBodySchema,
    responses: {
      200: ReviewSchema,
      ...CommonErrors
    },
    summary: 'Update own review'
  },
  deleteReview: {
    method: 'DELETE',
    path: '/products/:slug/reviews/:reviewId',
    pathParams: ReviewParamsSchema,
    body: z.object({}),
    responses: {
      200: z.object({ success: z.literal(true) }),
      ...CommonErrors
    },
    summary: 'Delete review'
  }
});
