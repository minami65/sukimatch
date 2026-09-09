from pydantic import BaseModel


class LikeBase(BaseModel):
    id: int
    from_user_id: int
    to_user_id: int

    class Config:
        from_attributes = True


class LikeResponse(BaseModel):
    like: LikeBase
    is_match: bool
    match_id: int | None = None


class DeleteResponse(BaseModel):
    message: str
