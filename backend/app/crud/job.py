from app.models.job import Job
from sqlalchemy.orm import Session


def get_job(db: Session):
    return db.query(Job).all()
