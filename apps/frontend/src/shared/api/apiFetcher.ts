import { type ApiFetcherArgs, tsRestFetchApi } from '@ts-rest/core';
import { HttpError } from '@/shared/api/HttpError';

export const apiFetcher = async (args: ApiFetcherArgs) => {
  try {
    return await tsRestFetchApi({
      ...args,
      fetchOptions: {
        ...args.fetchOptions,
        credentials: 'include'
      }
    });
  } catch (error) {
    if (HttpError.isHttpError(error)) throw error;

    if (error instanceof TypeError) {
      throw new HttpError(0, {
        code: 'NETWORK_ERROR',
        message: 'Network Error',
        details: error.message
      });
    }

    throw new HttpError(-1, {
      code: 'UNKNOWN_ERROR',
      message: 'Unknown Error',
      details: error instanceof Error ? error.message : String(error)
    });
  }
};
