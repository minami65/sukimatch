from typing import Annotated

from app.crud.job import get_job
from app.db import SessionLocal
from app.schemas.job import JobResponse
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


DBSession = Annotated[Session, Depends(get_db)]


@router.get("/job", response_model=list[JobResponse])
def get_job_list(db: DBSession):
    return get_job(db)
