import {
  useLikeUserUsersUserIdLikePost,
  useUnlikeUserUsersUserIdLikeDelete,
} from '@/api/generated/endpoints/api';

export const useLikeUser = (options?: Parameters<typeof useLikeUserUsersUserIdLikePost>[0]) => {
  return useLikeUserUsersUserIdLikePost(options);
};

export const useUnLikeUser = (
  options?: Parameters<typeof useUnlikeUserUsersUserIdLikeDelete>[0],
) => {
  return useUnlikeUserUsersUserIdLikeDelete(options);
};
