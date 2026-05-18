from sqlalchemy.orm import Session
from app.models.user import User
from passlib.context import CryptContext
from app.schemas.user import UserUpdate
from fastapi import HTTPException

# パスワードのハッシュ化
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 登録
def create_user(db: Session, user):
    print("password:", user.password)
    hashed_password = pwd_context.hash(user.password)
    print("hashed_password",hashed_password)

    db_user = User(
        name= user.name,
        age= user.age,
        birthday = user.birthday,
        mail_address=user.mail_address,
        password=hashed_password,
        bio= user.bio,
        gender_id = user.gender_id,
        birth_location_id = user.birth_location_id,
        current_location_id = user.current_location_id,
        education_id = user.education_id,
        job_id= user.job_id,
        income_id= user.income_id,
        height= user.height,
        marriage_intention_id= user.marriage_intention_id,
        holiday_id= user.holiday_id,
        alcohol_id= user.alcohol_id,
        smoking_id= user.smoking_id,
        living_arrangement_id= user.living_arrangement_id,
        meeting_preference_id= user.meeting_preference_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

# 更新
def update_user(db: Session, user_id: int, user_data: UserUpdate):
    user = db.query(User).filter(User.user_id == user_id).first()

    if not user:
        return None

    if user_data.name is not None:
        user.name = user_data.name
    
    if user_data.age is not None:
        user.age = user_data.age

    if user_data.birthday is not None:
        user.birthday = user_data.birthday

    if user_data.mail_address is not None:
        user.mail_address = user_data.mail_address

    if user_data.bio is not None:
        user.bio = user_data.bio

    if user_data.gender_id is not None:
        user.gender_id = user_data.gender_id
        
    if user_data.birth_location_id is not None:
        user.birth_location_id = user_data.birth_location_id
    
    if user_data.current_location_id is not None:
        user.current_location_id = user_data.current_location_id

    if user_data.education_id is not None:
        user.education_id = user_data.education_id

    if user_data.job_id is not None:
        user.job_id = user_data.job_id

    if user_data.income_id is not None:
        user.income_id = user_data.income_id

    if user_data.height is not None:
        user.height = user_data.height

    if user_data.marriage_intention_id is not None:
        user.marriage_intention_id = user_data.marriage_intention_id

    if user_data.holiday_id is not None:
        user.holiday_id = user_data.holiday_id

    if user_data.alcohol_id is not None:
        user.alcohol_id = user_data.alcohol_id

    if user_data.smoking_id is not None:
        user.smoking_id = user_data.smoking_id

    if user_data.living_arrangement_id is not None:
        user.living_arrangement_id = user_data.living_arrangement_id

    if user_data.meeting_preference_id is not None:
        user.meeting_preference_id = user_data.meeting_preference_id

    # パスワードのハッシュ化
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
    return db.query(User).filter(User.user_id == user_id).first()

# 検索
def search_user(db:Session,):
    return db.query(User).filter().all()

# 削除
def delete_user(db:Session,user_id:int):
    user = db.query(User).filter(User.user_id == user_id).first()
    
    if user is None:
        return None
    
    db.delete(user)
    db.commit()
    return user

# メールアドレスが一致するユーザーの取得
def get_user_by_mail_address(db:Session,mail_address:str):
    return db.query(User).filter(User.mail_address == mail_address).first()

# パスワードリセット
def password_reset(db:Session,mail_address:str ,password:str):
    user = db.query(User).filter(User.mail_address == mail_address).first()
    if not user:
        raise HTTPException (status_code=404 , detail="ユーザーが存在しません")
    user.password = pwd_context.hash(password)

    db.commit()
    db.refresh(user)
    return user
