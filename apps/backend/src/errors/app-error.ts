import { ErrorCodes, type ErrorCode, type ApiError } from '@freshly/contracts';

export abstract class AppError extends Error {
  public abstract readonly statusCode: number;
  public readonly code: ErrorCode;
  public readonly details?: unknown;

  protected constructor(message: string, code: ErrorCode, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  toResponse(): ApiError {
    return {
      code: this.code,
      message: this.message,
      ...(this.details !== undefined ? { details: this.details } : {})
    };
  }
}

export class BadRequestError extends AppError {
  readonly statusCode = 400;
  constructor(message = 'Bad request', code: ErrorCode = ErrorCodes.BAD_REQUEST, details?: unknown) {
    super(message, code, details);
  }
}

export class UnauthorizedError extends AppError {
  readonly statusCode = 401;
  constructor(message = 'Unauthorized', code: ErrorCode = ErrorCodes.UNAUTHORIZED, details?: unknown) {
    super(message, code, details);
  }
}

export class ForbiddenError extends AppError {
  readonly statusCode = 403;
  constructor(message = 'Forbidden', code: ErrorCode = ErrorCodes.FORBIDDEN, details?: unknown) {
    super(message, code, details);
  }
}

export class NotFoundError extends AppError {
  readonly statusCode = 404;
  constructor(message = 'Resource not found', code: ErrorCode = ErrorCodes.NOT_FOUND, details?: unknown) {
    super(message, code, details);
  }
}

export class ConflictError extends AppError {
  readonly statusCode = 409;
  constructor(message = 'Conflict', code: ErrorCode = ErrorCodes.CONFLICT, details?: unknown) {
    super(message, code, details);
  }
}

export class ValidationError extends AppError {
  readonly statusCode = 422;
  constructor(message = 'Validation failed', code: ErrorCode = ErrorCodes.VALIDATION_ERROR, details?: unknown) {
    super(message, code, details);
  }
}

export class TooManyRequestsError extends AppError {
  readonly statusCode = 429;
  constructor(message = 'Too many requests', code: ErrorCode = ErrorCodes.TOO_MANY_REQUESTS, details?: unknown) {
    super(message, code, details);
  }
}
