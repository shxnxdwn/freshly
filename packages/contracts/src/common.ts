import { z } from 'zod';

const brandedUuid = <T extends string>(brand: T) => z.string().uuid().brand(brand);
const brandedInt = <T extends string>(brand: T) => z.number().int().positive().brand(brand);

export const UserId = brandedUuid('UserId');
export const AddressId = brandedUuid('AddressId');
export const OrderId = brandedUuid('OrderId');
export const MessageId = brandedUuid('MessageId');
export const ChatId = brandedUuid('ChatId');
export const PaymentId = brandedUuid('PaymentId');

export const CategoryId = brandedInt('CategoryId');
export const ProductId = brandedInt('ProductId');
export const ReviewId = brandedInt('ReviewId');

export type TUserId = z.infer<typeof UserId>;
export type TAddressId = z.infer<typeof AddressId>;
export type TOrderId = z.infer<typeof OrderId>;
export type TMessageId = z.infer<typeof MessageId>;
export type TChatId = z.infer<typeof ChatId>;
export type TPaymentId = z.infer<typeof PaymentId>;
export type TCategoryId = z.infer<typeof CategoryId>;
export type TProductId = z.infer<typeof ProductId>;
export type TReviewId = z.infer<typeof ReviewId>;

export const SlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const DateTimeSchema = z.string().datetime({ offset: true });

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
    hasPrev: z.boolean()
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
  details: z.unknown().optional()
});

export type TApiError = z.infer<typeof ApiErrorSchema>;

export const CommonErrors = {
  400: ApiErrorSchema,
  401: ApiErrorSchema,
  403: ApiErrorSchema,
  404: ApiErrorSchema,
  422: ApiErrorSchema,
  429: ApiErrorSchema,
  500: ApiErrorSchema
} as const;
