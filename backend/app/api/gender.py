from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.gender import get_gender
from app.schemas.gender import GenderResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/gender", response_model=list[GenderResponse])
def get_gender_list(db: Session = Depends(get_db)):
    return get_gender(db)
