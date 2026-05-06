import { z } from 'zod';
import { c } from './contract';
import {
    ReviewId, UserId, ProductId, SlugSchema,
    DateTimeSchema, PaginationQuerySchema, paginatedOf, CommonErrors,
} from './common';

export const ReviewSchema = z.object({
    id: ReviewId,
    productId: ProductId,
    userId: UserId,
    rating: z.number().int().min(1).max(5),
    text: z.string().min(10).max(200).optional(),
    createdAt: DateTimeSchema,
});
export type TReview = z.infer<typeof ReviewSchema>;

export const CreateReviewBodySchema = ReviewSchema.pick({
    rating: true,
    text: true,
});

export type TCreateReviewBody = z.infer<typeof CreateReviewBodySchema>;

export const reviewContract = c.router({
    getReviews: {
        method: 'GET',
        path: '/products/:slug/reviews',
        pathParams: z.object({ slug: SlugSchema }),
        query: PaginationQuerySchema,
        responses: {
            200: paginatedOf(ReviewSchema),
            ...CommonErrors,
        },
        summary: 'Get product reviews',
    },
    createReview: {
        method: 'POST',
        path: '/products/:slug/reviews',
        pathParams: z.object({ slug: SlugSchema }),
        body: CreateReviewBodySchema,
        responses: {
            201: ReviewSchema,
            ...CommonErrors,
        },
        summary: 'Create product review',
    },
});
