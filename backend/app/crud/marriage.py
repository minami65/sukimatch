from sqlalchemy.orm import Session
from app.models.marriage import Marriage

def get_marriage(db:Session):
  return db.query(Marriage).all()
