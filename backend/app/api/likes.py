# api
from app.api.deps import CurrentUser, DBSession
from app.core.connection_manager import manager

# cruds
from app.crud.likes import create_like, delete_like, get_liked_by_users, get_my_likes

# schemas
from app.schemas.likes import DeleteResponse, LikeResponse
from fastapi import APIRouter

router = APIRouter()


@router.post("/users/{user_id}/like", response_model=LikeResponse)
async def like_user(
    user_id: int,
    db: DBSession,
    current_user: CurrentUser,
):
    """
    いいねをするAPI
    """
    print(f"=== [DEBUG] current_user.user_id: {current_user.user_id} ===")
    print(f"=== [DEBUG] target_user_id: {user_id} ===")

    # 1. DB側のいいね・マッチ処理を実行
    result = create_like(db, current_user.user_id, user_id)

    print(f"DEBUG: is_match = {result.get('is_match')}")

    # 💡 2. マッチングが成立した場合、相手(user_id)にWebSocketで通知を飛ばす！
    if result.get("is_match"):
        await manager.send_personal_message(
            {
                "event": "MATCH",
                "data": {
                    "matched_user_id": current_user.user_id,
                    "message": "新しいマッチングが成立しました！",
                },
            },
            user_id=user_id,  # 送信対象：いいねされた相手
        )

    return result


@router.get("/users/me/likes")
def get_my_like_users(db: DBSession, current_user: CurrentUser):
    """
    自分がしたいいねを取得するAPI
    """
    return get_my_likes(db, current_user.user_id)


@router.get("/users/me/liked-by")
def get_liked_by(db: DBSession, current_user: CurrentUser):
    """
    自分に来たいいねを取得するAPI
    """
    return get_liked_by_users(db, current_user.user_id)


@router.delete("/users/{user_id}/like", response_model=DeleteResponse)
def unlike_user(
    user_id: int,
    db: DBSession,
    current_user: CurrentUser,
):
    """
    いいねを取り消すAPI
    """
    return delete_like(db, current_user.user_id, user_id)
