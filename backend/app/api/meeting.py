from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.meeting import get_meeting
from app.schemas.meeting import MeetingResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/meeting", response_model=list[MeetingResponse])
def get_meeting_list(db: Session = Depends(get_db)):
    return get_meeting(db)
