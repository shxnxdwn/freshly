import { z } from 'zod';

export const brandedId = <T extends string>(brand: T) => z.string().uuid().brand(brand);

export const UserId = brandedId('UserId');
export type TUserId = z.infer<typeof UserId>;

export const CategoryId = brandedId('CategoryId');
export type TCategoryId = z.infer<typeof CategoryId>;

export const ProductId = brandedId('ProductId');
export type TProductId = z.infer<typeof ProductId>;

export const OrderId = brandedId('OrderId');
export type TOrderId = z.infer<typeof OrderId>;

export const AddressId = brandedId('AddressId');
export type TAddressId = z.infer<typeof AddressId>;

export const ReviewId = brandedId('ReviewId');
export type TReviewId = z.infer<typeof ReviewId>;

export const MessageId = brandedId('MessageId');
export type TMessageId = z.infer<typeof MessageId>;


export const SlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lowercase alphanumeric with hyphens (no leading/trailing/consecutive hyphens)',
});


export const DateTimeSchema = z.string().datetime({offset: true});


export const PaginationQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20)
});

export type TPaginationQuery = z.infer<typeof PaginationQuerySchema>;

export const paginatedOf = <T extends z.ZodTypeAny>(schema: T) =>
    z.object({
        items: z.array(schema),
        total: z.number().int().nonnegative(),
        page: z.number().int().positive(),
        limit: z.number().int().positive(),
        hasNext: z.boolean(),
        hasPrev: z.boolean(),
    });

export type TPaginated<T> = {
    items: T[];
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
};


export const ApiErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
});

export type TApiError = z.infer<typeof ApiErrorSchema>;

export const CommonErrors = {
    400: ApiErrorSchema,
    401: ApiErrorSchema,
    403: ApiErrorSchema,
    404: ApiErrorSchema,
    422: ApiErrorSchema,
    429: ApiErrorSchema,
    500: ApiErrorSchema,
} as const;
