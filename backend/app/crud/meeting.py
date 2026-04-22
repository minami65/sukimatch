from sqlalchemy.orm import Session
from app.models.meeting_preference import Meeting

def get_meeting(db:Session):
  return db.query(Meeting).all()
