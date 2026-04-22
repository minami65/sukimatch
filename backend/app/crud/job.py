from sqlalchemy.orm import Session
from app.models.job import Job

def get_job(db:Session):
  return db.query(Job).all()
