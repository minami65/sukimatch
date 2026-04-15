from pydantic import BaseModel

class UserCreate(BaseModel):
    nickname: str
    mail_address: str
    password: str

class UserUpdate(BaseModel):
    nickname:str | None = None
    mail_address:str | None = None
    password:str | None = None

class UserResponse(BaseModel):
    id:int
    nickname:str
    mail_address:str

    class Config:
        from_attributes = True
