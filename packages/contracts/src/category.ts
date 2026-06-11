import { z } from 'zod';
import { c } from './contract';
import { CategoryIdSchema, SlugSchema, CommonErrors } from './common';

export const CategorySchema = z.object({
  id: CategoryIdSchema,
  name: z.string().min(1).max(255),
  slug: SlugSchema,
  imageUrl: z.string().url().nullable(),
  isActive: z.boolean()
});

export type Category = z.infer<typeof CategorySchema>;

export const categoryContract = c.router({
  getCategories: {
    method: 'GET',
    path: '/categories',
    responses: {
      200: z.array(CategorySchema),
      ...CommonErrors
    },
    summary: 'Get all categories'
  }
});
