from sqlalchemy.orm import Session
import app.models.user as User
from passlib.context import CryptContext
from app.schemas.user import UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_user(db: Session, user):
    hashed_password = pwd_context.hash(user.password)

    db_user = User(
        nickname=user.nickname,
        mail_address=user.mail_address,
        password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def update_user(db: Session, user_id: int, user_data: UserUpdate):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return None

    if user_data.nickname is not None:
        user.nickname = user_data.nickname

    if user_data.mail_address is not None:
        user.mail_address = user_data.mail_address

    if user_data.password is not None:
        user.password = user_data.password  

    db.commit()
    db.refresh(user)

    return user
