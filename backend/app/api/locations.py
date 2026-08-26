from app.api.deps import DBSession
from app.crud.locations import get_locations
from app.schemas.locations import LocationResponse
from fastapi import APIRouter

router = APIRouter()


@router.get("/locations", response_model=list[LocationResponse])
def get_location_list(db: DBSession):
    return get_locations(db)
