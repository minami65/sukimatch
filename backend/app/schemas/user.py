from app.models.user import AlcoholEnum, EducationEnum, GenderEnum, HolidayEnum, IncomeEnum, LivingArrangementEnum, MarriageIntentionEnum, MeetingPreferenceEnum, SmokingEnum
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
    height: Optional[int] = None

    # Enum項目
    gender: Optional[GenderEnum] = None
    smoking: Optional[SmokingEnum] = None
    alcohol: Optional[AlcoholEnum] = None
    marriage_intention: Optional[MarriageIntentionEnum] = None
    meeting_preference: Optional[MeetingPreferenceEnum] = None
    living_arrangement: Optional[LivingArrangementEnum] = None
    education: Optional[EducationEnum] = None
    income: Optional[IncomeEnum] = None
    holiday: Optional[HolidayEnum] = None

    # マスタ参照項目
    birth_location_id: Optional[int] = None
    current_location_id: Optional[int] = None
    job_id: Optional[int] = None


class UserUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    birthday: Optional[date] = None
    mail_address: Optional[str] = None
    password: Optional[str] = None
    bio: Optional[str] = None
    height: Optional[int] = None

    # Enum項目
    gender: Optional[GenderEnum] = None
    smoking: Optional[SmokingEnum] = None
    alcohol: Optional[AlcoholEnum] = None
    marriage_intention: Optional[MarriageIntentionEnum] = None
    meeting_preference: Optional[MeetingPreferenceEnum] = None
    living_arrangement: Optional[LivingArrangementEnum] = None
    education: Optional[EducationEnum] = None
    income: Optional[IncomeEnum] = None
    holiday: Optional[HolidayEnum] = None

    # マスタ参照項目
    birth_location_id: Optional[int] = None
    current_location_id: Optional[int] = None
    job_id: Optional[int] = None


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
    height: Optional[int] = None

    # Enum項目
    gender: Optional[GenderEnum] = None
    smoking: Optional[SmokingEnum] = None
    alcohol: Optional[AlcoholEnum] = None
    marriage_intention: Optional[MarriageIntentionEnum] = None
    meeting_preference: Optional[MeetingPreferenceEnum] = None
    living_arrangement: Optional[LivingArrangementEnum] = None
    education: Optional[EducationEnum] = None
    income: Optional[IncomeEnum] = None
    holiday: Optional[HolidayEnum] = None

    # マスタ参照項目
    birth_location_id: Optional[int] = None
    current_location_id: Optional[int] = None
    job_id: Optional[int] = None
    current_location: Optional[LocationResponse] = None
    images: List[UserImageResponse] = []

    class Config:
        from_attributes = True


class UserDetailResponse(UserResponse):
    is_liked: bool

    class Config:
        from_attributes = True
