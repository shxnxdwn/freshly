import { type ApiError, type ErrorCode, ErrorCodes } from '@freshly/contracts';

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

  public toResponse(): ApiError {
    return {
      code: this.code,
      message: this.message,
      ...(this.details !== undefined ? { details: this.details } : {})
    };
  }
}

export class BadRequestError extends AppError {
  public readonly statusCode = 400;

  public constructor(message = 'Bad request', code: ErrorCode = ErrorCodes.BAD_REQUEST, details?: unknown) {
    super(message, code, details);
  }
}

export class UnauthorizedError extends AppError {
  public readonly statusCode = 401;

  public constructor(message = 'Unauthorized', code: ErrorCode = ErrorCodes.UNAUTHORIZED, details?: unknown) {
    super(message, code, details);
  }
}

export class ForbiddenError extends AppError {
  public readonly statusCode = 403;

  public constructor(message = 'Forbidden', code: ErrorCode = ErrorCodes.FORBIDDEN, details?: unknown) {
    super(message, code, details);
  }
}

export class NotFoundError extends AppError {
  public readonly statusCode = 404;

  public constructor(message = 'Resource not found', code: ErrorCode = ErrorCodes.NOT_FOUND, details?: unknown) {
    super(message, code, details);
  }
}

export class ConflictError extends AppError {
  public readonly statusCode = 409;

  public constructor(message = 'Conflict', code: ErrorCode = ErrorCodes.CONFLICT, details?: unknown) {
    super(message, code, details);
  }
}

export class ValidationError extends AppError {
  public readonly statusCode = 422;

  public constructor(message = 'Validation failed', code: ErrorCode = ErrorCodes.VALIDATION_ERROR, details?: unknown) {
    super(message, code, details);
  }
}

export class TooManyRequestsError extends AppError {
  public readonly statusCode = 429;

  public constructor(message = 'Too many requests', code: ErrorCode = ErrorCodes.TOO_MANY_REQUESTS, details?: unknown) {
    super(message, code, details);
  }
}
