import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@/components/Button';
import { LoadingSpinner } from '@/components/Loading/LoadingSpinner';
import { PageHeader } from '@/components/PageHeader';

import { useAuth } from '@/hooks/useAuth';
import { useInfiniteMessages, useMarkAsRead, useSendMessage } from '@/hooks/useMessages';

import defaultAvatar from '@/assets/default-avatar.png';
import { formatTalkTimestamp, getMessageDateLabel } from '@/lib/date';

import Styles from './TalkRoom.module.css';

export default function TalkRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user } = useAuth();
  const myUserId = user?.id ?? user?.user_id;

  const { matchId } = useParams<{ matchId: string }>();
  const id = Number(matchId);

  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  const observerTarget = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMessages(id);
  const { sendMessage, isPending: isSending } = useSendMessage();
  const { markAsRead } = useMarkAsRead();

  // テキストが変わるたびに textarea の高さを自動調整する
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 高さの再計算のために一旦リセット
    textarea.style.height = 'auto';

    // 5行分の高さ（scrollHeight）までは自動で伸びる
    textarea.style.height = `${textarea.scrollHeight}px`;

    // 5行を超えてスクロールが発生した場合、入力中の最下部（カーソル位置）を確実に視界に入れる
    textarea.scrollTop = textarea.scrollHeight;
  }, [inputText]);

  // ① 画面を開いた時（マウント時）に既読APIを呼ぶ
  useEffect(() => {
    if (id) {
      markAsRead(id);
    }
  }, [id]);

  // ② 一番上（過去方向）にスクロールした時、自動で追加の30件を読み込む
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 監視対象（一番上の要素）が見えていて、かつ次のページがある場合
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ③ メッセージ送信（楽観的アップデート）
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;

    const contentToSend = inputText;
    setInputText('');

    const queryKey = ['messages', id];

    // 進行中のクエリをキャンセルして、競合を防ぐ
    await queryClient.cancelQueries({ queryKey });

    // 失敗したときのために現在のキャッシュをバックアップしておく
    const previousData = queryClient.getQueryData(queryKey);

    // 楽観的に仮のメッセージを作成
    const optimisticMessage = {
      id: crypto.randomUUID(),
      sender_id: myUserId,
      content: contentToSend,
      content_type: 'text',
      created_at: new Date().toISOString(),
    };

    // キャッシュを直接書き換えて、画面に即座に反映させる
    queryClient.setQueryData(queryKey, (oldData: any) => {
      if (!oldData || !oldData.pages || oldData.pages.length === 0) return oldData;

      // 無限スクロールの「最初のページ」に仮メッセージを追加する
      const newPages = [...oldData.pages];
      const targetPage = { ...newPages[0] };

      // column-reverse の描画順に合わせてメッセージを追加
      targetPage.messages = [optimisticMessage, ...targetPage.messages];
      newPages[0] = targetPage;

      return {
        ...oldData,
        pages: newPages,
      };
    });

    sendMessage(
      id,
      { content: contentToSend, content_type: 'text' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey });
        },
        onError: () => {
          queryClient.setQueryData(queryKey, previousData);
          setInputText(contentToSend);
          alert('メッセージの送信に失敗しました');
        },
      },
    );

    scrollToBottom('smooth');
  };

  const handleBack = useCallback(() => {
    navigate('/talkList');
  }, [navigate]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
    requestAnimationFrame(() => {
      messagesAreaRef.current?.scrollIntoView({
        behavior,
        block: 'start',
      });
    });
  };

  const messages = data?.pages.flatMap((page) => page.messages) ?? [];
  const partnerInfo = data?.pages[0]?.partner;
  const partnerName = partnerInfo?.name ?? 'チャット相手';

  return (
    <div className={Styles.container}>
      <PageHeader title={partnerName} className={Styles.translucent} onBack={handleBack} />

      {/* メッセージエリア */}
      <div className={Styles.messageArea}>
        <div ref={messagesAreaRef} />

        {messages.map((msg, index) => {
          const isMe = msg.sender_id === myUserId;

          const currentDateLabel = getMessageDateLabel(msg.created_at);

          const nextMsg = messages[index + 1];
          const nextDateLabel = nextMsg ? getMessageDateLabel(nextMsg.created_at) : null;
          const showDateDivider = !nextMsg || currentDateLabel !== nextDateLabel;

          return (
            <React.Fragment key={msg.id}>
              <div className={`${Styles.messageRow} ${isMe ? Styles.me : Styles.partner}`}>
                {!isMe && (
                  <div className={Styles.avatarContainer}>
                    <img
                      src={partnerInfo?.avatar_url || defaultAvatar}
                      alt={partnerName}
                      className={Styles.avatarImage}
                    />
                  </div>
                )}

                <div className={Styles.messageContent}>
                  <div className={Styles.bubble}>{msg.content}</div>
                  <span className={Styles.time}>{formatTalkTimestamp(msg.created_at)}</span>
                </div>
              </div>

              {/* 日付の区切り線 */}
              {showDateDivider && (
                <div className={Styles.dateDividerContainer}>
                  <span className={Styles.dateDividerBadge}>{currentDateLabel}</span>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* 自動読み込みの発火ポイント */}
        <div ref={observerTarget}>
          {isFetchingNextPage && (
            <div className={Styles.loaderContainer}>
              <LoadingSpinner />
            </div>
          )}
        </div>

        {/* 一番古いメッセージがヘッダーの裏に隠れないようにするためのスペーサー */}
        <div className={Styles.headerSpacer} />
      </div>

      {/* 入力エリア */}
      <form className={Styles.inputArea} onSubmit={handleSend}>
        <textarea
          ref={textareaRef}
          placeholder="メッセージを入力"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          className={Styles.input}
          rows={1}
          autoComplete="off"
          autoCorrect="off"
        />
        <Button type="submit" disabled={!inputText.trim() || isSending} className={Styles.sendBtn}>
          送信
        </Button>
      </form>
    </div>
  );
}
