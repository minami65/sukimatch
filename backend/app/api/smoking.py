from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.smoking import get_smoking
from app.schemas.smoking import SmokingResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/smoking", response_model=list[SmokingResponse])
def get_smoking_list(db: Session = Depends(get_db)):
    return get_smoking(db)
