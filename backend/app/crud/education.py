from sqlalchemy.orm import Session
from app.models.education import Education

def get_education(db:Session):
  return db.query(Education).all()
