from sqlalchemy.orm import Session
from app.models.smoking import Smoking

def get_smoking(db:Session):
  return db.query(Smoking).all()
