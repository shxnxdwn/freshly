import fp from 'fastify-plugin';
import type { FastifyInstance } from 'fastify';
import { initServer } from '@ts-rest/fastify';
import { reviewContract } from '@freshly/contracts';
import { reviewService } from './review.service';

const s = initServer();

const reviewRouter = s.router(reviewContract, {
  getReviews: async ({ params, query }) => ({
    status: 200,
    body: await reviewService.getReviews(params.slug, query)
  }),

  createReview: async ({ request, params, body }) => ({
    status: 201,
    body: await reviewService.createReview(request.user.userId, params.slug, body)
  }),

  updateReview: async ({ request, params, body }) => ({
    status: 200,
    body: await reviewService.updateReview(request.user.userId, params.slug, params.reviewId, body)
  }),

  deleteReview: async ({ request, params }) => {
    await reviewService.deleteReview(request.user.userId, request.user.role, params.slug, params.reviewId);
    return { status: 200, body: { success: true as const } };
  }
});

export const reviewController = fp((fastify: FastifyInstance) => {
  fastify.register(s.plugin(reviewRouter));
});
