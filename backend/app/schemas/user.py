from app.models.user import GenderEnum
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date
from typing import List
from app.schemas.user_image import UserImageResponse


class UserCreate(BaseModel):
    name: str
    age: int
    birthday: date
    mail_address: EmailStr = None
    bio: Optional[str] = None
    password: str
    gender: Optional[GenderEnum] = None
    birth_location_id: Optional[int] = None
    current_location_id: Optional[int] = None
    education_id: Optional[int] = None
    job_id: Optional[int] = None
    income_id: Optional[int] = None
    height: Optional[int] = None
    marriage_intention_id: Optional[int] = None
    holiday_id: Optional[int] = None
    alcohol_id: Optional[int] = None
    smoking_id: Optional[int] = None
    living_arrangement_id: Optional[int] = None
    meeting_preference_id: Optional[int] = None


class UserUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    birthday: Optional[date] = None
    mail_address: Optional[str] = None
    password: Optional[str] = None
    bio: Optional[str] = None
    gender: Optional[GenderEnum] = None
    birth_location_id: Optional[int] = None
    current_location_id: Optional[int] = None
    education_id: Optional[int] = None
    job_id: Optional[int] = None
    income_id: Optional[int] = None
    height: Optional[int] = None
    marriage_intention_id: Optional[int] = None
    holiday_id: Optional[int] = None
    alcohol_id: Optional[int] = None
    smoking_id: Optional[int] = None
    living_arrangement_id: Optional[int] = None
    meeting_preference_id: Optional[int] = None


class LocationResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    user_id: int
    name: str
    mail_address: Optional[str] = None
    age: Optional[int] = None
    bio: Optional[str] = None
    gender: Optional[GenderEnum] = None
    birth_location_id: Optional[int] = None
    current_location_id: Optional[int] = None
    education_id: Optional[int] = None
    job_id: Optional[int] = None
    income_id: Optional[int] = None
    height: Optional[int] = None
    marriage_intention_id: Optional[int] = None
    holiday_id: Optional[int] = None
    alcohol_id: Optional[int] = None
    smoking_id: Optional[int] = None
    living_arrangement_id: Optional[int] = None
    meeting_preference_id: Optional[int] = None
    current_location: Optional[LocationResponse] = None
    images: List[UserImageResponse] = []

    class Config:
        from_attributes = True


class UserDetailResponse(UserResponse):
    is_liked: bool

    class Config:
        from_attributes = True
