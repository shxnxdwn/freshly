import { useQuery } from '@tanstack/react-query';
import { apiClient, unwrapResponse } from '@/shared/api/apiClient';

export const categoryKeys = {
  all: ['category'] as const,
  list: () => [...categoryKeys.all, 'list'] as const
};

export const categoryApi = {
  getCategories: async () => unwrapResponse(await apiClient.category.getCategories())
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoryKeys.list(),
    queryFn: categoryApi.getCategories
  });
