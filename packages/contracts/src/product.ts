import { z } from 'zod';
import { c } from './contract';
import {
    ProductId, CategoryId, SlugSchema, DateTimeSchema,
    PaginationQuerySchema, paginatedOf, CommonErrors,
} from './common';

export const UnitSchema = z.enum(['kg', 'g', 'mg', 'l', 'ml', 'pcs']);
export type TUnit = z.infer<typeof UnitSchema>;

export const ProductSortSchema = z.enum(['price_asc', 'price_desc', 'rating', 'newest']);
export type TProductSort = z.infer<typeof ProductSortSchema>;

export const ProductSchema = z.object({
    id: ProductId,
    name: z.string().min(1).max(100),
    slug: SlugSchema,
    description: z.string().max(2000),
    images: z.array(z.string().url()).min(1),
    categoryId: CategoryId,
    price: z.number().int().positive(),
    salePrice: z.number().int().positive().optional(),
    unit: UnitSchema,
    step: z.number().positive().default(1),
    minQuantity: z.number().positive().default(1),
    stock: z.number().int().nonnegative(),
    rating: z.number().min(0).max(5),
    reviewCount: z.number().int().nonnegative(),
    createdAt: DateTimeSchema,
});
export type TProduct = z.infer<typeof ProductSchema>;

export const ProductsQuerySchema = PaginationQuerySchema.extend({
    categorySlug: SlugSchema.optional(),
    search: z.string().max(100).optional(),
    sort: ProductSortSchema.optional(),
    onSale: z.coerce.boolean().optional(),
});
export type TProductsQuery = z.infer<typeof ProductsQuerySchema>;

export const productContract = c.router({
    getProducts: {
        method: 'GET',
        path: '/products',
        query: ProductsQuerySchema,
        responses: {
            200: paginatedOf(ProductSchema),
            ...CommonErrors,
        },
        summary: 'Get products list',
    },
    getProduct: {
        method: 'GET',
        path: '/products/:slug',
        pathParams: z.object({ slug: SlugSchema }),
        responses: {
            200: ProductSchema,
            ...CommonErrors,
        },
        summary: 'Get product by slug',
    },
});
