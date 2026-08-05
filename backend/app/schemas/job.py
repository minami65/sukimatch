from pydantic import BaseModel


class JobResponse(BaseModel):
    id: int
    job_name: str

    class Config:
        from_attributes = True
