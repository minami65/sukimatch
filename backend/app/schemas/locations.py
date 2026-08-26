from pydantic import BaseModel


class LocationResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
