import { useQueryClient } from '@tanstack/react-query';

import {
  getReadUnreadMatchesMatchesMeUnreadGetQueryKey,
  useReadUnreadMatchesMatchesMeUnreadGet,
  useUpdateMatchesReadStatusMatchesMeReadPut,
} from '@/api/generated/endpoints/api';

// 未読のマッチを取得
export const useUnreadMatches = () => {
  const { data, isLoading, isError, refetch } = useReadUnreadMatchesMatchesMeUnreadGet({
    query: {
      refetchOnWindowFocus: true,
      enabled: true,
    },
  });

  return {
    unreadMatches: data || [],
    isLoading,
    isError,
    refetch,
  };
};

// マッチの既読化
export const useMarkMatchesAsRead = () => {
  const queryClient = useQueryClient();

  const { mutate } = useUpdateMatchesReadStatusMatchesMeReadPut({
    mutation: {
      onSuccess: () => {
        const queryKey =
          typeof getReadUnreadMatchesMatchesMeUnreadGetQueryKey === 'function'
            ? getReadUnreadMatchesMatchesMeUnreadGetQueryKey()
            : ['/matches/me/unread'];

        queryClient.invalidateQueries({ queryKey });
      },
    },
  });

  const markAsRead = (matchIds: number[]) => {
    mutate({
      data: { match_ids: matchIds },
    });
  };

  return { markAsRead };
};
