import { useGetImagesUsersUserIdImagesGet, useGetMeUserMeGet } from '@/api/generated/endpoints/api';

// プロフィール取得
export const useMyProfile = () => {
  return useGetMeUserMeGet();
};

// 画像一覧取得
export const useUserImages = (userId?: number) => {
  return useGetImagesUsersUserIdImagesGet(userId!, {
    query: { enabled: !!userId },
  });
};

// メイン画像取得
export const useMainUserImage = (userId?: number) => {
  const { data, isLoading, error } = useUserImages(userId);
  const mainImage = data?.find((img) => img.sort_order === 1);

  return {
    mainImage,
    isLoading,
    error,
  };
};
