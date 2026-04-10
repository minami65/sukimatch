from pydantic import BaseModel

class UserCreate(BaseModel):
    nickname: str
    mail_address: str
    password: str
