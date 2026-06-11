import { useQuery } from '@tanstack/react-query';
import { apiClient, unwrapResponse } from '@/shared/api/apiClient';
import type { ProductsQuery } from '@freshly/contracts';

export const productKeys = {
  all: ['product'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (query: ProductsQuery) => [...productKeys.lists(), query] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (slug: string) => [...productKeys.details(), slug] as const
};

export const productApi = {
  getProducts: async (query: ProductsQuery) => unwrapResponse(await apiClient.product.getProducts({ query })),
  getProduct: async (slug: string) => unwrapResponse(await apiClient.product.getProduct({ params: { slug } }))
};

export const useGetProducts = (query: ProductsQuery) =>
  useQuery({
    queryKey: productKeys.list(query),
    queryFn: () => productApi.getProducts(query)
  });

export const useGetProduct = (slug: string) =>
  useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => productApi.getProduct(slug),
    enabled: !!slug
  });
