import { useEffect } from 'react';

export function useWebSocket() {
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

        // マッチングイベントの判定
        if (data.event === 'MATCH') {
          console.log('🎉 MATCHイベント受信！未読マッチを再取得します');

          window.dispatchEvent(new CustomEvent('ws-match-event'));
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
