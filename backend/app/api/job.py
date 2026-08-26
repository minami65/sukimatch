from app.api.deps import DBSession
from app.crud.job import get_job
from app.schemas.job import JobResponse
from fastapi import APIRouter

router = APIRouter()


@router.get("/job", response_model=list[JobResponse])
def get_job_list(db: DBSession):
    return get_job(db)
