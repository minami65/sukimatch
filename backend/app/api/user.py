from fastapi import APIRouter, Depends , Query
from typing import Optional
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.schemas.user import UserCreate
from app.crud.user import create_user
from app.schemas.user import UserUpdate
from app.crud.user import update_user
from app.crud.user import get_user
from app.crud.likes import create_like
from app.schemas.user import UserResponse
from app.crud.user import delete_user
from app.models.user import User
from app.api.deps import get_current_user
from app.crud.likes import get_my_likes ,get_liked_by_users,delete_like
from app.models.footprint import FootPrint
from app.crud.footprint import get_my_footprint

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

# 一覧参照
@router.get("/users")
def get_user_list(
    age:Optional[int] = Query(None),
    birthday:Optional [int] = Query(None),
    current_location_id:Optional[int] = Query(None),
    job_id:Optional[int] = Query(None),
    gender_id :Optional[int] = Query(None),
    education_id:Optional[int] = Query(None),
    income_id:Optional[int] = Query(None),
    min_height:Optional[int] = Query(None),
    max_height:Optional[int] = Query(None),
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
    if birthday :
        query = query.filter(User.birthday == birthday)
    if gender_id:
        query = query.filter(User.gender_id == gender_id)
    if current_location_id:
        query = query.filter(User.current_location_id == current_location_id)
    if job_id:
        query = query.filter(User.job_id == job_id)
    if education_id:
        query = query.filter(User.education_id == education_id)
    if min_height is not None:
        query = query.filter(User.height >= min_height)
    if max_height is not None:
        query = query.filter(User.height <= max_height)
    if income_id:
        query = query.filter(User.income_id == income_id)
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

# プロフィール更新
@router.put("/users/me")
def update(
    user_data: UserUpdate, 
    db: Session = Depends(get_db),
    current_user:User = Depends(get_current_user)):
    
    
    result = update_user(db,current_user.user_id,user_data)

    return result

@router.post("/users/{user_id}/like")
def like_user(
    user_id:int,
    db:Session = Depends(get_db),
    current_user:User = Depends(get_current_user)
    ):
    return create_like(db,current_user.user_id,user_id)

# 自分がしたいいね
@router.get("/users/me/likes")
def get_my_like_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_my_likes(db, current_user.user_id)

# じぶんにきたいいね
@router.get("/users/me/liked-by")
def get_liked_by(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_liked_by_users(db, current_user.user_id)

# いいね取り消し
@router.delete("/users/{user_id}/like")
def unlike_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return delete_like(db, current_user.user_id, user_id)

# 足跡（登録)
@router.post("/users/{user_id}/footprint")
def create_footprint(
    user_id:int,
    db:Session = Depends(get_db),
    current_user:User = Depends(get_current_user)
):
    if current_user.user_id == user_id:
        return {"自分には足跡つけません"}
    
    footprint = FootPrint(
        visitor_user_id = current_user.user_id,
        visited_user_id = user_id
    )
    db.add(footprint)
    db.commit()
    db.refresh(footprint)

    return footprint

# 足跡取得
@router.get("/users/me/footprint")
def get_visited_user(
    db:Session = Depends(get_db),
    current_user:User = Depends(get_current_user)
):  
    return get_my_footprint(db,current_user.user_id)
