from app.models.locations import Location
from sqlalchemy.orm import Session


def get_locations(db: Session):
    return db.query(Location).all()
