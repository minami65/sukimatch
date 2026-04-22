from sqlalchemy.orm import Session
from app.models.holiday import Holiday

def get_holiday(db:Session):
  return db.query(Holiday).all()
