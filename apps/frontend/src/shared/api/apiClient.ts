import { initClient } from '@ts-rest/core';
import { contract } from '@freshly/contracts';
import { HttpError } from '@/shared/api/HttpError';
import { apiFetcher } from '@/shared/api/apiFetcher';

export type ApiResponse<TSuccess, TError> =
  | { status: 200 | 201 | 204; body: TSuccess }
  | { status: Exclude<number, 200 | 201 | 204>; body: TError };

export const isSuccessStatus = (status: number) => status >= 200 && status < 300;

export const apiClient = initClient(contract, {
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  baseHeaders: {},
  api: apiFetcher
});

export const unwrapResponse = <TSuccess, TError>(response: ApiResponse<TSuccess, TError>): TSuccess => {
  if (isSuccessStatus(response.status)) {
    return response.body as TSuccess;
  }
  throw new HttpError(response.status, response.body);
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
