from fastapi import APIRouter, Depends , Query
from typing import Optional
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.schemas.user import UserCreate
from app.crud.user import create_user
from app.schemas.user import UserUpdate
from app.crud.user import update_user
from app.crud.user import get_users
from app.crud.user import get_user
from app.schemas.user import UserResponse
from app.crud.user import delete_user
from app.models.user import User
from app.api.deps import get_current_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 登録
@router.post("/user")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

# 更新
@router.put("/user/{user_id}")
def update(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    result = update_user(db, user_id, user)

    if not result:
        return {"error": "User not found"}

    return result

# 一覧参照
@router.get("/users")
def get_user_list(
    age:Optional[int] = Query(None),
    current_location_id:Optional[int] = Query(None),
    job_id:Optional[int] = Query(None),
    education_id:Optional[int] = Query(None),
    income_id:Optional[int] = Query(None),
    height:Optional[int] = Query(None),
    marriage_intention_id:Optional[int] = Query(None),
    holiday_id:Optional[int] = Query(None),
    alcohol_id:Optional[int] = Query(None),
    smoking_id:Optional[int] = Query(None),
    meeting_preference_id:Optional[int] = Query(None),
    db:Session = Depends(get_db)
):
    query = db.query(User)

    # 検索条件がある場合
    if age is not None:
        query = query.filter(User.age == age)
    if current_location_id:
        query = query.filter(User.current_location_id == current_location_id)
    if job_id:
        query = query.filter(User.job_id == job_id)
    if education_id:
        query = query.filter(User.education_id == education_id)
    if income_id:
        query = query.filter(User.income_id == income_id)
    if height: # 範囲の設定が必要？
        query = query.filter(User.height == height)
    if marriage_intention_id:
        query = query.filter(User.marriage_intention_id == marriage_intention_id)
    if holiday_id:
        query = query.filter(User.holiday_id == holiday_id)
    if alcohol_id:
        query = query.filter(User.alcohol_id == alcohol_id)
    if smoking_id:
        query = query.filter(User.smoking_id == smoking_id)
    if meeting_preference_id:
        query = query.filter(User.meeting_preference_id == meeting_preference_id)

    return query.all()

# 詳細取得
@router.get("/users/{user_id}",response_model=UserResponse)
def get_user_detail(user_id: int,db:Session = Depends(get_db)):
    user = get_user(db,user_id)

    if not user:
        return {"error":"User not found"}
    return user

# 削除
@router.delete("/user/{user_id}")
def delete(user_id: int,db:Session = Depends(get_db)):
    user = delete_user(db,user_id)
    return {"message":"user delete"}

# プロフィール取得
@router.get("/user/me")
def get_me(current_user:User = Depends(get_current_user)):
    return current_user
