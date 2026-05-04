import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const ProductSchema = z.object({
    id: z.string(),
    title: z.string().min(3),
    price: z.number().positive(),
});

export const apiContract = c.router({
    getProducts: {
        method: 'GET',
        path: '/products',
        responses: {
            200: z.array(ProductSchema),
        },
        summary: 'Список товаров',
    },
});
