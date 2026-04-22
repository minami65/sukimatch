from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.marriage import get_marriage
from app.schemas.marriage import MarriageResponse

router = APIRouter()

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

@router.get("/marriage",response_model=list[MarriageResponse])
def get_marriage_list(db:Session = Depends(get_db)):
  return get_marriage(db)
