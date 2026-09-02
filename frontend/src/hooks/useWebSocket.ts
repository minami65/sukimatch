import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getGetTalkListMatchesMeTalksGetQueryKey } from '@/api/generated/endpoints/api';

export function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // 1. ローカルストレージ等から JWT トークンを取得
    const token = localStorage.getItem('token'); // トークンの保存先名に合わせて変更してください
    if (!token) return;

    // 2. バックエンドの WebSocket エンドポイントへ接続
    const ws = new WebSocket(`ws://localhost:8000/ws?token=${token}`);

    // 接続成功時のログ
    ws.onopen = () => {
      console.log('🟢 WebSocket 接続に成功しました');
    };

    // 3. バックエンドからメッセージ（マッチ通知など）が届いたときの処理
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // ==========================================
        // ① マッチ処理
        // ==========================================
        if (data.event === 'MATCH') {
          console.log('🎉 MATCHイベント受信！未読マッチを再取得します');

          window.dispatchEvent(new CustomEvent('ws-match-event'));
        }

        // ==========================================
        // ② メッセージ処理
        // ==========================================
        if (data.type === 'NEW_MESSAGE') {
          console.log('✉️ NEW_MESSAGEイベント受信！', data);
          const { match_id, message } = data;

          // 1. トーク一覧のキャッシュは「更新があったよ」と教えるために無効化でOK
          queryClient.invalidateQueries({
            queryKey: getGetTalkListMatchesMeTalksGetQueryKey(),
          });

          // 2. メッセージ一覧は、サーバーに再取得を頼まず、手元のキャッシュに直接追加する！
          queryClient.setQueryData(['messages', match_id], (oldData: any) => {
            if (!oldData || !oldData.pages || oldData.pages.length === 0) {
              return oldData; // まだキャッシュがなければ何もしない
            }

            const newPages = [...oldData.pages];
            const targetPage = { ...newPages[0] };

            // 重複追加の防止チェック
            const exists = targetPage.messages.some((m: any) => m.id === message.id);
            if (!exists) {
              // 無限スクロールの先頭ページに新しいメッセージを追加
              targetPage.messages = [message, ...targetPage.messages];
              newPages[0] = targetPage;
            }

            return {
              ...oldData,
              pages: newPages,
            };
          });
        }
      } catch (error) {
        console.error('メッセージのパースに失敗しました:', error);
      }
    };

    // エラーハンドリング
    ws.onerror = (error) => {
      console.error('🔴 WebSocket エラー:', error);
    };

    // 4. コンポーネントがアンマウントされた時（ログアウトや画面移動時）に切断処理
    return () => {
      ws.close();
    };
  }, []);
}
