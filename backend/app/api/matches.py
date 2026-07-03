from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.schemas.matches import MatchItem
from app.crud.matches import get_my_matches

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/matches/me", response_model=list[MatchItem])
def read_my_matches(db: Session = Depends(get_db)):
    current_user_id = 1 
    
    return get_my_matches(db, user_id=current_user_id)