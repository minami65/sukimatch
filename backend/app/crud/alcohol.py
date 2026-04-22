from sqlalchemy.orm import Session
from app.models.alcohol import Alcohol

def get_alcohol(db:Session):
  return db.query(Alcohol).all()
