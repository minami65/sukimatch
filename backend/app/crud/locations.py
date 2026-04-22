from sqlalchemy.orm import Session
from app.models.locations import Location

def get_locations(db:Session):
  return db.query(Location).all()
