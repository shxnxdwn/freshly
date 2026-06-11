import { HttpError } from '@/shared/api/HttpError';

type TranslationFn = (key: string) => string;

interface LocalizedError {
  title: string;
  message: string;
}

const HTTP_STATUS_TO_CODE: Record<number, string> = {
  0: 'NETWORK_ERROR',
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  422: 'VALIDATION_ERROR',
  429: 'TOO_MANY_REQUESTS'
};

export const getLocalizedError = (error: unknown, t: TranslationFn): LocalizedError => {
  if (!HttpError.isHttpError(error)) {
    return {
      title: t('UNKNOWN_ERROR.title'),
      message: t('UNKNOWN_ERROR.message')
    };
  }

  const errorCode =
    error.code ||
    (error.status >= 500 ? 'INTERNAL_SERVER_ERROR' : HTTP_STATUS_TO_CODE[error.status]) ||
    'UNKNOWN_ERROR';

  return {
    title: t(`${errorCode}.title`),
    message: t(`${errorCode}.message`)
  };
};
