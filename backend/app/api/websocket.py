from app.core.connection_manager import manager
from app.core.jwt import decode_token
from fastapi import APIRouter, Query, WebSocket, WebSocketDisconnect, status
from jose import JWTError

router = APIRouter()


def get_user_id_from_token(token: str) -> int | None:
    """core/jwt.py の decode_token を使って JWT から user_id を検証・抽出する"""
    try:
        payload = decode_token(token)
        # auth.py で {"sub": str(user.user_id)} とセットしているため "sub" から取得
        user_id_str: str = payload.get("sub")
        if user_id_str is None:
            return None
        return int(user_id_str)
    except (JWTError, ValueError):
        return None


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket,
    token: str = Query(...),  # クエリパラメーター ?token=xxx からトークンを取得
):
    # 1. JWTトークンを検証して user_id を取得
    user_id = get_user_id_from_token(token)

    # トークンが無効な場合は接続を拒否して終了
    if user_id is None:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return

    # 2. シングルトンの ConnectionManager に接続を登録
    await manager.connect(user_id, websocket)

    try:
        # 3. クライアントが接続を維持している間、無限ループで待機
        while True:
            # フロント側からの ping やメッセージを受信待機（切断検知のため必要）
            await websocket.receive_text()

    except WebSocketDisconnect:
        # 4. ブラウザが閉じられたり回線が切れたら切断処理を実行
        manager.disconnect(user_id)
