import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import {
  getGetTalkListMatchesMeTalksGetQueryKey,
  getMessagesMatchesMatchIdMessagesGet,
  useCreateMessageMatchesMatchIdMessagesPost,
  useGetTalkListMatchesMeTalksGet,
  useMarkMessagesAsReadMatchesMatchIdReadPut,
} from '@/api/generated/endpoints/api';
import { MessageCreate } from '@/api/generated/models';
import { HTTPValidationError } from '@/api/generated/models';

/**
 * 1. トーク一覧を取得するフック
 */
export const useTalkList = () => {
  const query = useGetTalkListMatchesMeTalksGet();

  return {
    talks: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

/**
 * 2. 特定マッチのメッセージ一覧を取得するフック (無限スクロール版)
 */
export const useInfiniteMessages = (matchId: number) => {
  return useInfiniteQuery({
    queryKey: ['messages', matchId],
    queryFn: async ({ pageParam }) => {
      return getMessagesMatchesMatchIdMessagesGet(matchId, {
        limit: 30,
        before_id: pageParam,
      });
    },

    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.messages || lastPage.messages.length < 30) return undefined;
      return lastPage.messages[lastPage.messages.length - 1].id;
    },
    enabled: !!matchId,
  });
};

/**
 * 3. メッセージを送信するフック
 */
export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const mutation = useCreateMessageMatchesMatchIdMessagesPost();

  const sendMessage = (
    matchId: number,
    data: MessageCreate,
    options?: {
      onSuccess?: () => void;
      onError?: (error: HTTPValidationError) => void;
    },
  ) => {
    mutation.mutate(
      { matchId, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetTalkListMatchesMeTalksGetQueryKey(),
          });
          options?.onSuccess?.();
        },
        onError: (err: HTTPValidationError) => {
          options?.onError?.(err);
        },
      },
    );
  };

  return {
    sendMessage,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

/**
 * 4. メッセージを既読にするフック
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  const mutation = useMarkMessagesAsReadMatchesMatchIdReadPut();

  const markAsRead = (
    matchId: number,
    options?: {
      onSuccess?: () => void;
      onError?: (error: HTTPValidationError) => void;
    },
  ) => {
    mutation.mutate(
      { matchId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetTalkListMatchesMeTalksGetQueryKey(),
            refetchType: 'none',
          });
          options?.onSuccess?.();
        },
        onError: (err: HTTPValidationError) => {
          options?.onError?.(err);
        },
      },
    );
  };

  return {
    markAsRead,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
};
