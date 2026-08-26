from pydantic import BaseModel, EmailStr, model_validator


class LoginRequest(BaseModel):
    mail_address: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class PasswordReset(BaseModel):
    mail_address: EmailStr
    password: str
    password_confirm: str

    @model_validator(mode="after")
    def check_password(self):
        if self.password != self.password_confirm:
            raise ValueError("パスワードが一致しません")
        return self
