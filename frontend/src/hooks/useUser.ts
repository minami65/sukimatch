import {
  useGetImagesUsersUserIdImagesGet,
  useGetMeUserMeGet,
  useGetUserDetailUsersUserIdGet,
  useGetUserListUsersGet,
  useUpdateUsersMePut,
} from '@/api/generated/endpoints/api';
import { GetUserListUsersGetParams } from '@/api/generated/models';
import { ImageItem } from '@/pages/profile/schemas/profileSchema';

// ユーザ画像一覧取得
export const useUserImages = (userId?: number) => {
  return useGetImagesUsersUserIdImagesGet(userId!, {
    query: { enabled: !!userId },
  });
};

// ユーザのメイン画像取得
export const useMainUserImage = (userId?: number) => {
  const { data, isLoading, error } = useUserImages(userId);
  const mainImage = data?.find((img) => Number(img.sort_order) === 1) ?? data?.[0];
  console.log('data:', data);
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

// 自分のユーザ情報取得
export const useCurrentUserDetail = () => {
  return useGetMeUserMeGet();
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

// ユーザー情報更新import { useUpdateUsersMePut } from './api/generated';
export const useUpdateProfile = (options?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  const { mutate, isPending, isError, error } = useUpdateUsersMePut({
    mutation: {
      onSuccess: () => options?.onSuccess?.(),
      onError: (err) => options?.onError?.(err),
    },
  });

  const updateProfile = (formValues: any) => {
    const { images, ...restFormValues } = formValues;

    const keepImageIds: number[] = [];
    const newImages: File[] = [];

    images?.forEach((img: ImageItem) => {
      if (img.file) {
        newImages.push(img.file);
      } else if (img.id) {
        keepImageIds.push(img.id);
      }
    });

    mutate({
      data: {
        ...restFormValues,
        keep_image_ids: keepImageIds,
        new_images: newImages,
      },
    });
  };

  return {
    updateProfile,
    isLoading: isPending,
    isError,
    error,
  };
};
