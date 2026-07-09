from pydantic import BaseModel
from typing import List

class MatchUserProfile(BaseModel):
    user_id: int
    name: str
    age: int

class MatchItem(BaseModel):
    match_id: int
    is_chat_started: bool
    user: MatchUserProfile
