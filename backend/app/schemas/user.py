from pydantic import BaseModel

class UserCreate(BaseModel):
    user_id:int
    name:str
    age:int
    mail_address: str
    password: str
    bio:str
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

class UserUpdate(BaseModel):
    user_id:int
    name:str
    age:int
    mail_address: str
    password: str
    bio:str
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

class UserResponse(BaseModel):
    user_id:int
    name:str
    age:int
    mail_address: str
    password: str
    bio:str
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
