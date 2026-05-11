from sqlalchemy.orm import Session
from app.models.gender import Gender

def get_gender(db:Session):
  return db.query(Gender).all()
