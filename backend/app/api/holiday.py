from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.holiday import get_holiday
from app.schemas.holiday import HolidayResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/holiday", response_model=list[HolidayResponse])
def get_holiday_list(db: Session = Depends(get_db)):
    return get_holiday(db)
