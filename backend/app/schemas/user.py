from datetime import date

from app.models.user import (
    AlcoholEnum,
    EducationEnum,
    GenderEnum,
    HolidayEnum,
    IncomeEnum,
    LivingArrangementEnum,
    MarriageIntentionEnum,
    MeetingPreferenceEnum,
    SmokingEnum,
)
from app.schemas.user_image import UserImageResponse
from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    age: int
    birthday: date
    mail_address: EmailStr = None
    bio: str | None = None
    password: str
    height: int | None = None

    # Enum項目
    gender: GenderEnum | None = None
    smoking: SmokingEnum | None = None
    alcohol: AlcoholEnum | None = None
    marriage_intention: MarriageIntentionEnum | None = None
    meeting_preference: MeetingPreferenceEnum | None = None
    living_arrangement: LivingArrangementEnum | None = None
    education: EducationEnum | None = None
    income: IncomeEnum | None = None
    holiday: HolidayEnum | None = None

    # マスタ参照項目
    birth_location_id: int | None = None
    current_location_id: int | None = None
    job_id: int | None = None


class LocationResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class UserResponse(BaseModel):
    user_id: int
    name: str
    mail_address: str | None = None
    age: int | None = None
    bio: str | None = None
    height: int | None = None

    # Enum項目
    gender: GenderEnum | None = None
    smoking: SmokingEnum | None = None
    alcohol: AlcoholEnum | None = None
    marriage_intention: MarriageIntentionEnum | None = None
    meeting_preference: MeetingPreferenceEnum | None = None
    living_arrangement: LivingArrangementEnum | None = None
    education: EducationEnum | None = None
    income: IncomeEnum | None = None
    holiday: HolidayEnum | None = None

    # マスタ参照項目
    birth_location_id: int | None = None
    current_location_id: int | None = None
    job_id: int | None = None
    current_location: LocationResponse | None = None
    images: list[UserImageResponse] = []

    class Config:
        from_attributes = True


class UserDetailResponse(UserResponse):
    is_liked: bool

    class Config:
        from_attributes = True
