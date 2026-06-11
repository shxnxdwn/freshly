import { z } from 'zod';
import { c } from './contract';
import {
  ProductIdSchema,
  CategoryIdSchema,
  SlugSchema,
  DateTimeSchema,
  PaginationQuerySchema,
  paginatedOf,
  CommonErrors
} from './common';

export const ProductSortSchema = z.enum(['price_asc', 'price_desc', 'rating', 'newest']);
export type ProductSort = z.infer<typeof ProductSortSchema>;

export const ProductSchema = z.object({
  id: ProductIdSchema,
  categoryId: CategoryIdSchema,
  sku: z.string().max(300),
  name: z.string().min(1).max(255),
  slug: SlugSchema,
  description: z.string().nullable(),
  price: z.number().int().positive(),
  salePrice: z.number().int().positive().nullable(),
  stock: z.number().int().nonnegative(),
  imageUrls: z.array(z.string().url()).min(1),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().nonnegative(),
  isActive: z.boolean(),
  deletedAt: DateTimeSchema.nullable(),
  createdAt: DateTimeSchema
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductsQuerySchema = PaginationQuerySchema.extend({
  categorySlug: SlugSchema.optional(),
  search: z.string().max(100).optional(),
  sort: ProductSortSchema.optional(),
  onSale: z.coerce.boolean().optional()
});

export type ProductsQuery = z.infer<typeof ProductsQuerySchema>;

export const productContract = c.router({
  getProducts: {
    method: 'GET',
    path: '/products',
    query: ProductsQuerySchema,
    responses: {
      200: paginatedOf(ProductSchema),
      ...CommonErrors
    },
    summary: 'Get products'
  },
  getProduct: {
    method: 'GET',
    path: '/products/:slug',
    pathParams: z.object({ slug: SlugSchema }),
    responses: {
      200: ProductSchema,
      ...CommonErrors
    },
    summary: 'Get product'
  }
});
