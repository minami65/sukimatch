from pydantic import BaseModel


class UserImageResponse(BaseModel):
    id: int
    image_url: str
    sort_order: int

    class Config:
        from_attributes = True
