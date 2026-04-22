from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.income import get_income
from app.schemas.income import IncomeResponse

router = APIRouter()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@router.get("/income",response_model=list[IncomeResponse])
def get_income_list(db:Session = Depends(get_db)):
  return get_income(db)
