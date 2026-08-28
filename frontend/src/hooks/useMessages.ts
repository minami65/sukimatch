import {
  useCreateMessageMatchesMatchIdMessagesPost,
  useGetMessagesMatchesMatchIdMessagesGet,
  useGetTalkListMatchesMeTalksGet,
  useMarkMessagesAsReadMatchesMatchIdReadPut,
} from '@/api/generated/endpoints/api';
import { GetMessagesMatchesMatchIdMessagesGetParams, MessageCreate } from '@/api/generated/models';
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
 * 2. 特定マッチのメッセージ一覧を取得するフック
 */
export const useMessages = (
  matchId: number,
  params?: GetMessagesMatchesMatchIdMessagesGetParams,
) => {
  const query = useGetMessagesMatchesMatchIdMessagesGet(matchId, params, {
    query: {
      enabled: !!matchId,
    },
  });

  return {
    messages: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};

/**
 * 3. メッセージを送信するフック
 */
export const useSendMessage = () => {
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
