from sqlalchemy.orm import Session
import app.models.user as u
print("👉", u.__file__)
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(db: Session, user):
    hashed_password = pwd_context.hash(user.password)

    db_user = Customer(
        nickname=user.nickname,
        mail_address=user.mail_address,
        password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
