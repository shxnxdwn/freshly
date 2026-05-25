import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, unwrapResponse } from '@/shared/api/apiClient';
import type { TUpdateProfileBody } from '@freshly/contracts';

export const userKeys = {
  profile: ['user', 'profile'] as const
};

export const userApi = {
  getProfile: async () => unwrapResponse(await apiClient.user.getProfile()),
  updateProfile: async (body: TUpdateProfileBody) => unwrapResponse(await apiClient.user.updateProfile({ body }))
};

export const useGetProfile = () =>
  useQuery({
    queryKey: userKeys.profile,
    queryFn: userApi.getProfile
  });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.profile, data);
    }
  });
};
