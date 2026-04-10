from pydantic import BaseModel

class CustomerCreate(BaseModel):
    nickname: str
    mail_address: str
    password: str
