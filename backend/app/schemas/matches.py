from pydantic import BaseModel


class MatchUserProfile(BaseModel):
    user_id: int
    name: str
    age: int
    image_url: str | None = None


class MatchItem(BaseModel):
    match_id: int
    user1_checked_match: bool
    user2_checked_match: bool
    user: MatchUserProfile

    class Config:
        from_attributes = True  # ORMのデータを直接扱えるようにする


class MarkReadRequest(BaseModel):
    match_ids: list[int]
