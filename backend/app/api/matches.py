from app.api.deps import get_current_user
from app.models.user import User
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.schemas.matches import MatchItem, MarkReadRequest
from app.crud.matches import get_my_matches, get_unread_matches, mark_matches_as_read

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/matches/me", response_model=list[MatchItem])
def read_my_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_my_matches(db, user_id=current_user.user_id)


@router.get("/matches/me/unread", response_model=list[MatchItem])
def read_unread_matches(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_unread_matches(db, user_id=current_user.user_id)


@router.put("/matches/me/read")
def update_matches_read_status(
    request: MarkReadRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    mark_matches_as_read(
        db,
        user_id=current_user.user_id,
        match_ids=request.match_ids
    )
    return {"message": "Matches marked as read successfully"}
