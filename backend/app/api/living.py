from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.living import get_living
from app.schemas.living import LivingResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/living", response_model=list[LivingResponse])
def get_job_list(db: Session = Depends(get_db)):
    return get_living(db)
