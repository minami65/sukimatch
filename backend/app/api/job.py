from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.job import get_job
from app.schemas.job import JobResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/job", response_model=list[JobResponse])
def get_job_list(db: Session = Depends(get_db)):
    return get_job(db)
