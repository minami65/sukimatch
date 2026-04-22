from sqlalchemy.orm import Session
from app.models.living_arrangement import Living

def get_living(db:Session):
  return db.query(Living).all()
