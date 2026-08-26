from app.api.deps import CurrentUser, DBSession
from app.crud.matches import get_my_matches, get_unread_matches, mark_matches_as_read
from app.schemas.matches import MarkReadRequest, MatchItem
from fastapi import APIRouter

router = APIRouter()


@router.get("/matches/me", response_model=list[MatchItem])
def read_my_matches(db: DBSession, current_user: CurrentUser):
    return get_my_matches(db, user_id=current_user.user_id)


@router.get("/matches/me/unread", response_model=list[MatchItem])
def read_unread_matches(db: DBSession, current_user: CurrentUser):
    return get_unread_matches(db, user_id=current_user.user_id)


@router.put("/matches/me/read")
def update_matches_read_status(
    request: MarkReadRequest,
    db: DBSession,
    current_user: CurrentUser,
):
    mark_matches_as_read(db, user_id=current_user.user_id, match_ids=request.match_ids)
    return {"message": "Matches marked as read successfully"}
