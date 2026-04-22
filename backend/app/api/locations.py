from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.crud.locations import get_locations
from app.schemas.locations import LocationResponse

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/locations", response_model=list[LocationResponse])
def get_location_list(db: Session = Depends(get_db)):
    return get_locations(db)
