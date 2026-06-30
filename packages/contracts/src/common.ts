import { z } from 'zod';

const brandedUuid = <T extends string>(brand: T) => z.string().uuid().brand(brand);
const brandedInt = <T extends string>(brand: T) => z.number().int().positive().brand(brand);

export const UserIdSchema = brandedUuid('UserId');
export const AddressIdSchema = brandedUuid('AddressId');
export const OrderIdSchema = brandedUuid('OrderId');
export const OrderItemIdSchema = brandedUuid('OrderItemId');
export const MessageIdSchema = brandedUuid('MessageId');
export const ChatIdSchema = brandedUuid('ChatId');
export const PaymentIdSchema = brandedUuid('PaymentId');
export const CategoryIdSchema = brandedInt('CategoryId');
export const ProductIdSchema = brandedInt('ProductId');
export const ReviewIdSchema = brandedInt('ReviewId');

export type UserId = z.infer<typeof UserIdSchema>;
export type AddressId = z.infer<typeof AddressIdSchema>;
export type OrderId = z.infer<typeof OrderIdSchema>;
export type OrderItemId = z.infer<typeof OrderItemIdSchema>;
export type MessageId = z.infer<typeof MessageIdSchema>;
export type ChatId = z.infer<typeof ChatIdSchema>;
export type PaymentId = z.infer<typeof PaymentIdSchema>;
export type CategoryId = z.infer<typeof CategoryIdSchema>;
export type ProductId = z.infer<typeof ProductIdSchema>;
export type ReviewId = z.infer<typeof ReviewIdSchema>;

export const SlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const DateTimeSchema = z.string().datetime({ offset: true });

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20)
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export const paginatedOf = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    items: z.array(schema),
    total: z.number().int().nonnegative(),
    page: z.number().int().positive(),
    limit: z.number().int().positive(),
    hasNext: z.boolean(),
    hasPrev: z.boolean()
  });

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export const GenericErrorCodes = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
} as const;

export const DomainErrorCodes = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  INVALID_REFRESH_TOKEN: 'INVALID_REFRESH_TOKEN',
  PRODUCT_OUT_OF_STOCK: 'PRODUCT_OUT_OF_STOCK',
  CART_EMPTY: 'CART_EMPTY',
  REVIEW_ALREADY_EXISTS: 'REVIEW_ALREADY_EXISTS',
  ORDER_CANNOT_BE_CANCELLED: 'ORDER_CANNOT_BE_CANCELLED'
} as const;

export const ErrorCodes = {
  ...GenericErrorCodes,
  ...DomainErrorCodes
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

const errorCodeValues = Object.values(ErrorCodes) as [ErrorCode, ...ErrorCode[]];

export const ErrorCodeSchema = z.enum(errorCodeValues);

export const ApiErrorSchema = z.object({
  code: ErrorCodeSchema,
  message: z.string(),
  details: z.unknown().optional()
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export const CommonErrors = {
  400: ApiErrorSchema,
  401: ApiErrorSchema,
  403: ApiErrorSchema,
  404: ApiErrorSchema,
  409: ApiErrorSchema,
  422: ApiErrorSchema,
  429: ApiErrorSchema,
  500: ApiErrorSchema
} as const;
