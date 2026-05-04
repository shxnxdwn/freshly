import { z } from 'zod';
import { c } from './contract';
import { CategoryId, SlugSchema, CommonErrors } from './common';

export const CategorySchema = z.object({
    id: CategoryId,
    name: z.string().min(1).max(50),
    slug: SlugSchema,
    emoji: z.string().optional(),
});

export type TCategory = z.infer<typeof CategorySchema>;

export const categoryContract = c.router({
    getCategories: {
        method: 'GET',
        path: '/categories',
        responses: {
            200: z.array(CategorySchema),
            ...CommonErrors,
        },
        summary: 'Get all categories',
    },
});
