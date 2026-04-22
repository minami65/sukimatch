from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.alcohol import get_alcohol
from app.schemas.alcohol import AlcoholResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/alcohol", response_model=list[AlcoholResponse])
def get_alcohol_list(db: Session = Depends(get_db)):
    return get_alcohol(db)
