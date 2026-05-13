from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class UserCreate(BaseModel):
    name: str
    age: int
    birthday :date
    mail_address: EmailStr
    password: str
    bio: Optional[str] = None

    gender_id:int
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
    name:Optional[str] = None
    age:Optional[int] = None
    birthday :Optional[int] = None
    mail_address: Optional[str] = None
    password: Optional[str] = None
    bio:Optional[str] = None
    gender_id :Optional[int] = None
    birth_location_id:Optional[int] = None
    current_location_id:Optional[int] = None
    education_id:Optional[int] = None
    job_id:Optional[int] = None
    income_id:Optional[int] = None
    height:Optional[int] = None
    marriage_intention_id:Optional[int] = None
    holiday_id:Optional[int] = None
    alcohol_id:Optional[int] = None
    smoking_id:Optional[int] = None
    living_arrangement_id:Optional[int] = None
    meeting_preference_id:Optional[int] = None

class UserResponse(BaseModel):
    user_id:int
    name:str
    age:int
    birthday:date
    mail_address: str
    password: str
    bio:str
    gender_id:int
    birth_location_id:int
    current_location_id:int
    education_id:int
    job_id:int
    income_id:int
    height:int
    marriage_intention_id:int
    holiday_id:int
    alcohol_id:int
    smoking_id:int
    living_arrangement_id:int
    meeting_preference_id:int

    class Config:
        from_attributes = True
