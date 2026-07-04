import fp from 'fastify-plugin';
import type { FastifyError, FastifyInstance, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { RequestValidationError } from '@ts-rest/fastify';
import { type ApiError, type ErrorCode, ErrorCodes } from '@freshly/contracts';
import { AppError } from '../errors/app-error';

const mapFastifyStatusToCode = (statusCode: number): ErrorCode => {
  switch (statusCode) {
    case 400:
      return ErrorCodes.BAD_REQUEST;
    case 401:
      return ErrorCodes.UNAUTHORIZED;
    case 403:
      return ErrorCodes.FORBIDDEN;
    case 404:
      return ErrorCodes.NOT_FOUND;
    case 409:
      return ErrorCodes.CONFLICT;
    case 422:
      return ErrorCodes.VALIDATION_ERROR;
    case 429:
      return ErrorCodes.TOO_MANY_REQUESTS;
    default:
      return statusCode >= 500 ? ErrorCodes.INTERNAL_SERVER_ERROR : ErrorCodes.BAD_REQUEST;
  }
};

const logByStatus = (request: FastifyRequest, error: unknown, statusCode: number) => {
  if (statusCode >= 500) {
    request.log.error(error);
  } else {
    request.log.warn(error);
  }
};

export const errorHandlerPlugin = fp( (app: FastifyInstance) => {
  app.setNotFoundHandler((request, reply) => {
    const body: ApiError = {
      code: ErrorCodes.NOT_FOUND,
      message: `Route ${request.method} ${request.url} not found`
    };
    reply.status(404).send(body);
  });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      logByStatus(request, error, error.statusCode);
      return reply.status(error.statusCode).send(error.toResponse());
    }

    if (error instanceof RequestValidationError) {
      const issues = [
        ...(error.pathParams?.issues ?? []),
        ...(error.headers?.issues ?? []),
        ...(error.query?.issues ?? []),
        ...(error.body?.issues ?? [])
      ].map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      }));

      const body: ApiError = {
        code: ErrorCodes.VALIDATION_ERROR,
        message: 'Invalid request parameters or body',
        details: issues
      };
      logByStatus(request, error, 422);
      return reply.status(422).send(body);
    }

    if (error instanceof ZodError) {
      const body: ApiError = {
        code: ErrorCodes.VALIDATION_ERROR,
        message: 'Validation failed',
        details: error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message
        }))
      };
      logByStatus(request, error, 422);
      return reply.status(422).send(body);
    }

    const fastifyError = error as FastifyError;
    if (typeof fastifyError.statusCode === 'number') {
      const body: ApiError = {
        code: mapFastifyStatusToCode(fastifyError.statusCode),
        message: fastifyError.message
      };
      logByStatus(request, error, fastifyError.statusCode);
      return reply.status(fastifyError.statusCode).send(body);
    }

    const body: ApiError = {
      code: ErrorCodes.INTERNAL_SERVER_ERROR,
      message: 'Internal server error'
    };
    logByStatus(request, error, 500);
    return reply.status(500).send(body);
  });
});
