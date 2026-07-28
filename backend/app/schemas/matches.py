from pydantic import BaseModel
from typing import List, Optional


class MatchUserProfile(BaseModel):
    user_id: int
    name: str
    age: int
    image_url: Optional[str] = None


class MatchItem(BaseModel):
    match_id: int
    user1_checked_match: bool
    user2_checked_match: bool
    user: MatchUserProfile

    class Config:
        from_attributes = True  # ORMのデータを直接扱えるようにする


class MarkReadRequest(BaseModel):
    match_ids: List[int]
