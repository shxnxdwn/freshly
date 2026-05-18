import { initClient, type ApiFetcherArgs, tsRestFetchApi } from '@ts-rest/core';
import { Contract } from '@freshly/contracts';
import { ApiError } from '@/shared/api/ApiError';

export type ApiResponse<TSuccess, TError> =
  | { status: 200 | 201 | 204; body: TSuccess }
  | { status: Exclude<number, 200 | 201 | 204>; body: TError };

export const isSuccessStatus = (status: number) => status >= 200 && status < 300;

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

export const apiClient = initClient(Contract, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  baseHeaders: {},
  api: apiFetcher
});

export const unwrapResponse = <TSuccess, TError>(response: ApiResponse<TSuccess, TError>): TSuccess => {
  if (isSuccessStatus(response.status)) {
    return response.body as TSuccess;
  }
  throw new ApiError(response.status, response.body);
};

export const unwrapResponseOr = <TSuccess, TError, TFallback>(
  response: ApiResponse<TSuccess, TError>,
  fallback: TFallback
): TSuccess | TFallback => {
  if (isSuccessStatus(response.status)) {
    return response.body as TSuccess;
  }
  return fallback;
};
