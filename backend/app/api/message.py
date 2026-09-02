from app.api.deps import CurrentUser, DBSession
from app.core.connection_manager import manager
from app.crud.message import crud_message
from app.schemas.message import (
    MessageCreate,
    MessageResponse,
    ReadResponse,
    RoomMessagesResponse,
    TalkListItem,
)
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/matches", tags=["messages"])


@router.get("/{match_id}/messages", response_model=RoomMessagesResponse)
def get_messages(
    match_id: int,
    current_user: CurrentUser,
    db: DBSession,
    limit: int = 30,
    before_id: int | None = None,
):
    # 1. 権限チェック 兼 相手のプロフィール（メタ情報）取得
    partner_info = crud_message.get_room_meta(db, match_id, current_user.user_id)
    if not partner_info:
        raise HTTPException(status_code=403, detail="Not authorized or match not found")

    # 2. メッセージ一覧の取得（0件の場合は [] が返る）
    messages = crud_message.get_by_match_id(
        db, match_id=match_id, limit=limit, before_id=before_id
    )

    # 3. 新しいスキーマの形（箱）に詰めてフロントへ返す
    return RoomMessagesResponse(partner=partner_info, messages=messages)


@router.post("/{match_id}/messages", response_model=MessageResponse)
async def create_message(
    match_id: int,
    payload: MessageCreate,
    current_user: CurrentUser,
    db: DBSession,
):
    # 1. 権限チェック 兼 相手のユーザーID取得
    partner_id = crud_message.get_partner_id(
        db, match_id=match_id, user_id=current_user.user_id
    )
    if not partner_id:
        raise HTTPException(status_code=403, detail="Not authorized to send message")

    # 2. メッセージをDBに保存
    new_message = crud_message.create(
        db, obj_in=payload, match_id=match_id, sender_id=current_user.user_id
    )

    # 3. 相手(partner_id)がオンラインなら WebSocket で直接通知！
    event_data = {
        "type": "NEW_MESSAGE",
        "match_id": match_id,
        "message": MessageResponse.model_validate(new_message).model_dump(mode="json"),
    }
    await manager.send_personal_message(event_data, user_id=partner_id)

    # 4. フロント(送信者)にレスポンスを返す
    return new_message


@router.get("/me/talks", response_model=list[TalkListItem])
def get_talk_list(current_user: CurrentUser, db: DBSession):
    """
    ログイン中のユーザーのトーク一覧（相手の名前、アイコン、最新メッセージ）を取得
    """
    return crud_message.get_talk_list(db, user_id=current_user.user_id)


@router.put("/{match_id}/read", response_model=ReadResponse)
def mark_messages_as_read(
    match_id: int,
    current_user: CurrentUser,
    db: DBSession,
):
    """
    特定トークルームの未読メッセージをすべて既読にするAPI
    """
    is_valid = crud_message.check_user_in_match(
        db, match_id=match_id, user_id=current_user.user_id
    )
    if not is_valid:
        raise HTTPException(status_code=403, detail="Not authorized")

    count = crud_message.mark_as_read(
        db, match_id=match_id, current_user_id=current_user.user_id
    )
    return ReadResponse(updated_count=count)
