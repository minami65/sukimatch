from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.db import SessionLocal

# api
from app.api.deps import get_current_user

# cruds
from app.crud.likes import (
    create_like,
    get_my_likes,
    get_liked_by_users,
    delete_like
)

# schemas
from app.schemas.likes import (
    LikeResponse,
    DeleteResponse
)

# models
from app.models.user import User

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/users/{user_id}/like", response_model=LikeResponse)
def like_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    いいねをするAPI
    """
    print(f"=== [DEBUG] current_user.user_id: {current_user.user_id} ===")
    print(f"=== [DEBUG] user_id: {user_id} ===")
    return create_like(
        db,
        current_user.user_id,
        user_id
    )


@router.get("/users/me/likes")
def get_my_like_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    自分がしたいいねを取得するAPI
    """
    return get_my_likes(db, current_user.user_id)


@router.get("/users/me/liked-by")
def get_liked_by(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    自分に来たいいねを取得するAPI
    """
    return get_liked_by_users(db, current_user.user_id)


@router.delete("/users/{user_id}/like", response_model=DeleteResponse)
def unlike_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    いいねを取り消すAPI
    """
    return delete_like(
        db,
        current_user.user_id,
        user_id
    )
