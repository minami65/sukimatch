from app.api.deps import CurrentUser, DBSession
from app.crud.message import crud_message
from app.schemas.message import (
    MessageCreate,
    MessageResponse,
    ReadResponse,
    TalkListItem,
)
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/matches", tags=["messages"])


@router.get("/{match_id}/messages", response_model=list[MessageResponse])
def get_messages(match_id: int, db: DBSession, limit: int = 30):
    return crud_message.get_by_match_id(db, match_id=match_id, limit=limit)


@router.post("/{match_id}/messages", response_model=MessageResponse)
def create_message(
    match_id: int,
    payload: MessageCreate,
    current_user: CurrentUser,
    db: DBSession,
):
    # 認可チェック
    is_valid = crud_message.check_user_in_match(
        db, match_id=match_id, user_id=current_user.user_id
    )
    if not is_valid:
        raise HTTPException(status_code=403, detail="Not authorized to send message")

    # 作成処理
    return crud_message.create(
        db, obj_in=payload, match_id=match_id, sender_id=current_user.user_id
    )


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
