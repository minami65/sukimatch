import {
  useGetImagesUsersUserIdImagesGet,
  useGetUserDetailUsersUserIdGet,
  useGetUserListUsersGet,
} from '@/api/generated/endpoints/api';
import { GetUserListUsersGetParams } from '@/api/generated/models';

// ユーザ画像一覧取得
export const useUserImages = (userId?: number) => {
  return useGetImagesUsersUserIdImagesGet(userId!, {
    query: { enabled: !!userId },
  });
};

// ユーザのメイン画像取得
export const useMainUserImage = (userId?: number) => {
  const { data, isLoading, error } = useUserImages(userId);
  const mainImage = data?.find((img) => img.sort_order === 1);

  return {
    mainImage,
    isLoading,
    error,
  };
};

// ユーザ情報取得
export const useUserDetail = (userId?: number) => {
  return useGetUserDetailUsersUserIdGet(userId!, {
    query: {
      enabled: !!userId,
      retry: false,
    },
  });
};

// 自分を含めた全てのユーザー一覧
export const useUserList = (params?: GetUserListUsersGetParams) => {
  return useGetUserListUsersGet(params);
};

// 自分を除いた全てのユーザー一覧
export const useFilteredUsers = (
  params: GetUserListUsersGetParams | undefined,
  currentUserId: number,
) => {
  const { data, isLoading, error, refetch } = useUserList(params);

  const users = data?.filter((user) => user.user_id !== currentUserId) ?? [];

  return {
    users,
    isLoading,
    error,
    refetch,
  };
};
