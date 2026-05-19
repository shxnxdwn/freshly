import { type ApiFetcherArgs, tsRestFetchApi } from '@ts-rest/core';
import { ApiError } from '@/shared/api/ApiError';

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
    if (ApiError.isApiError(error)) throw error;

    if (error instanceof TypeError) {
      throw new ApiError(0, {
        code: 'NETWORK_ERROR',
        message: 'Network Error',
        details: error.message
      });
    }

    throw new ApiError(-1, {
      code: 'UNKNOWN_ERROR',
      message: 'Unknown Error',
      details: error instanceof Error ? error.message : String(error)
    });
  }
};
