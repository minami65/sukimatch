from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.education import get_education
from app.schemas.education import EducationResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/education", response_model=list[EducationResponse])
def get_education_list(db: Session = Depends(get_db)):
    return get_education(db)
