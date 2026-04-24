from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    mail_address: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
