import type { ClientErrorCode } from '@/shared/api/HttpError';
import { HttpError } from '@/shared/api/HttpError';
import { DomainErrorCodes } from '@freshly/contracts';

const HTTP_STATUS_TO_CODE: Record<number, ClientErrorCode> = {
  0: 'NETWORK_ERROR',
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'VALIDATION_ERROR',
  429: 'TOO_MANY_REQUESTS'
};

const DOMAIN_CODES = new Set<string>(Object.values(DomainErrorCodes));

export function resolveClientErrorCode(error: unknown): ClientErrorCode {
  if (HttpError.isHttpError(error)) {
    return error.code ?? HTTP_STATUS_TO_CODE[error.status] ?? 'UNKNOWN_ERROR';
  }

  if (error && typeof error === 'object' && 'status' in error && typeof error.status === 'number') {
    const status = error.status;
    if ('code' in error && typeof error.code === 'string') {
      return error.code as ClientErrorCode;
    }
    if (status >= 500) return 'INTERNAL_SERVER_ERROR';
    return HTTP_STATUS_TO_CODE[status] ?? 'UNKNOWN_ERROR';
  }

  if (error instanceof TypeError || (error instanceof Error && /network/i.test(error.message))) {
    return 'NETWORK_ERROR';
  }

  return 'UNKNOWN_ERROR';
}

export function getErrorTranslationKeys(code: ClientErrorCode) {
  const section = DOMAIN_CODES.has(code) ? 'domain' : 'generic';

  return {
    titleKey: `${section}.${code}.title` as const,
    messageKey: `${section}.${code}.message` as const
  };
}
