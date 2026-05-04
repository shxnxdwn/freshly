import { z } from 'zod';

export const brandedId = <T extends string>(brand: T) => z.string().uuid().brand(brand);

export const UserId = brandedId('UserId');
export const CategoryId = brandedId('CategoryId');
export const ProductId = brandedId('ProductId');
export const OrderId = brandedId('OrderId');
export const AddressId = brandedId('AddressId');
export const ReviewId = brandedId('ReviewId');
export const MessageId = brandedId('MessageId');

export type UserId = z.infer<typeof UserId>;
export type CategoryId = z.infer<typeof CategoryId>;
export type ProductId = z.infer<typeof ProductId>;
export type OrderId = z.infer<typeof OrderId>;
export type AddressId = z.infer<typeof AddressId>;
export type ReviewId = z.infer<typeof ReviewId>;
export type MessageId = z.infer<typeof MessageId>;

export const Slug = z.string().regex(/^[a-z0-9-]+$/);

export const IsoDate = z.coerce.date();

export const PaginationQuery = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).default(20),
});

export type PaginationQuery = z.infer<typeof PaginationQuery>;

export const paginatedOf = <T extends z.ZodTypeAny>(schema: T) =>
    z.object({
        items: z.array(schema),
        total: z.number().int().nonnegative(),
        page: z.number().int().positive(),
        limit: z.number().int().positive(),
        hasNext: z.boolean(),
    });

export const ApiErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export const CommonErrors = {
    400: ApiErrorSchema,
    401: ApiErrorSchema,
    403: ApiErrorSchema,
    404: ApiErrorSchema,
    422: ApiErrorSchema,
    429: ApiErrorSchema,
    500: ApiErrorSchema,
} as const;
