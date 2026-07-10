import type { ApiError, ErrorCode } from '@freshly/contracts';

export type ClientErrorCode = ErrorCode | 'NETWORK_ERROR' | 'UNKNOWN_ERROR';

export class HttpError extends Error {
  public static readonly STATUS = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    SERVER_ERROR: 500
  } as const;
  public readonly status: number;
  public readonly body: unknown;
  public readonly isHttpError = true as const;
  public readonly code?: ClientErrorCode;
  public readonly details?: unknown;

  constructor(status: number, body: unknown) {
    super(HttpError.extractMessage(body));
    this.name = 'HttpError';
    this.status = status;
    this.body = body;

    if (HttpError.isContractApiError(body)) {
      this.code = body.code;
      this.details = body.details;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }

  get isUnauthorized(): boolean {
    return this.status === HttpError.STATUS.UNAUTHORIZED;
  }

  get isForbidden(): boolean {
    return this.status === HttpError.STATUS.FORBIDDEN;
  }

  get isNotFound(): boolean {
    return this.status === HttpError.STATUS.NOT_FOUND;
  }

  get isConflict(): boolean {
    return this.status === HttpError.STATUS.CONFLICT;
  }

  get isValidationError(): boolean {
    return this.status === HttpError.STATUS.UNPROCESSABLE_ENTITY;
  }

  get isTooManyRequests(): boolean {
    return this.status === HttpError.STATUS.TOO_MANY_REQUESTS;
  }

  get isClientError(): boolean {
    return this.status >= 400 && this.status < HttpError.STATUS.SERVER_ERROR;
  }

  get isLocalError(): boolean {
    return this.status < 0;
  }

  get isServerError(): boolean {
    return this.status >= HttpError.STATUS.SERVER_ERROR;
  }

  get isNetworkError(): boolean {
    return this.status === 0;
  }

  static extractMessage(body: unknown): string {
    if (typeof body === 'string') return body;
    if (!body) return 'HTTP Error, no body provided';

    if (typeof body === 'object') {
      const { message } = body as Record<string, unknown>;
      if (typeof message === 'string') return message;
    }

    return 'HTTP Error';
  }

  static isHttpError(error: unknown): error is HttpError {
    return (
      error instanceof HttpError ||
      (typeof error === 'object' && error !== null && 'isHttpError' in error && error.isHttpError === true)
    );
  }

  private static isContractApiError(body: unknown): body is ApiError {
    if (typeof body !== 'object' || body === null) return false;
    const record = body as Record<string, unknown>;
    return typeof record.code === 'string' && typeof record.message === 'string';
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
