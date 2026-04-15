from sqlalchemy.orm import Session
from app.models.user import User
from passlib.context import CryptContext
from app.schemas.user import UserUpdate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 登録
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

# 更新
def update_user(db: Session, user_id: int, user_data: UserUpdate):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        return None

    if user_data.nickname is not None:
        user.nickname = user_data.nickname

    if user_data.mail_address is not None:
        user.mail_address = user_data.mail_address

    # TODO:パスワードのハッシュ化
    if user_data.password is not None:
        user.password = user_data.password  

    db.commit()
    db.refresh(user)

    return user

# 一覧参照
def get_users(db:Session):
    return db.query(User).all()

# 詳細取得
def get_user(db:Session, user_id:int):
    return db.query(User).filter(User.id == user_id).first()

# 検索

# 削除
    
