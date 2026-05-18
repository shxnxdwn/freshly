import type { TApiError } from '@freshly/contracts';

export class ApiError extends Error {
  public readonly status: number;
  public readonly body: unknown;
  public readonly isApiError = true as const;
  public readonly code?: string;
  public readonly details?: unknown;

  public static readonly STATUS = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    SERVER_ERROR: 500
  } as const;

  constructor(status: number, body: unknown) {
    super(ApiError.extractMessage(body));
    this.name = 'ApiError';
    this.status = status;
    this.body = body;

    if (ApiError.isContractError(body)) {
      this.code = body.code;
      this.details = body.details;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  private static isContractError(body: unknown): body is TApiError {
    if (typeof body !== 'object' || body === null) return false;
    const record = body as Record<string, unknown>;
    return typeof record.code === 'string' && typeof record.message === 'string';
  }

  static extractMessage(body: unknown): string {
    if (typeof body === 'string') return body;
    if (!body) return 'API Error, no body provided';

    if (typeof body === 'object') {
      const { message } = body as Record<string, unknown>;
      if (typeof message === 'string') return message;
    }

    return 'API Error';
  }

  static isApiError(error: unknown): error is ApiError {
    return (
      error instanceof ApiError ||
      (typeof error === 'object' && error !== null && 'isApiError' in error && (error as ApiError).isApiError)
    );
  }

  get isUnauthorized(): boolean {
    return this.status === ApiError.STATUS.UNAUTHORIZED;
  }

  get isForbidden(): boolean {
    return this.status === ApiError.STATUS.FORBIDDEN;
  }

  get isNotFound(): boolean {
    return this.status === ApiError.STATUS.NOT_FOUND;
  }

  get isValidationError(): boolean {
    return this.status === ApiError.STATUS.UNPROCESSABLE_ENTITY;
  }

  get isTooManyRequests(): boolean {
    return this.status === ApiError.STATUS.TOO_MANY_REQUESTS;
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < ApiError.STATUS.SERVER_ERROR;
  }

  get isLocalError(): boolean {
    return this.status < 0;
  }

  get isServerError(): boolean {
    return this.status >= ApiError.STATUS.SERVER_ERROR;
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }

  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
      details: this.details,
      body: this.body
    };
  }
}
