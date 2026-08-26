from typing import Annotated

from app.crud.locations import get_locations
from app.db import SessionLocal
from app.schemas.locations import LocationResponse
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


DBSession = Annotated[Session, Depends(get_db)]


@router.get("/locations", response_model=list[LocationResponse])
def get_location_list(db: DBSession):
    return get_locations(db)
