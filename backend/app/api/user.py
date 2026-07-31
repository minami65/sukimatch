from fastapi import APIRouter, Depends, Query, HTTPException, status
from typing import Optional
from sqlalchemy.orm import Session, joinedload

from app.db import SessionLocal
from app.schemas.user import UserCreate, UserUpdate, UserResponse, UserDetailResponse
from app.crud.user import (
    create_user,
    update_user,
    password_reset,
    delete_user
)
from app.models.user import AlcoholEnum, SmokingEnum, User, GenderEnum
from app.api.deps import get_current_user

from app.models.footprint import FootPrint
from app.crud.footprint import get_my_footprint
from app.schemas.auth import PasswordReset

from app.services.user_service import get_user_detail_with_like

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 登録
@router.post("/user", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)


# パスワード再登録
@router.put("/password/reset")
def reset_user_password(
    data: PasswordReset,
    db: Session = Depends(get_db)
):
    password_reset(db, data.mail_address, data.password_confirm)
    return {"message": "password reset"}


# 一覧参照
@router.get("/users", response_model=list[UserResponse])
def get_user_list(
    exclude_user_id: Optional[int] = Query(None),
    min_age: Optional[int] = Query(None),
    max_age: Optional[int] = Query(None),
    birthday: Optional[int] = Query(None),
    current_location_id: Optional[int] = Query(None),
    job_id: Optional[int] = Query(None),

    gender: Optional[GenderEnum] = Query(None),
    smoking: Optional[SmokingEnum] = Query(None),
    alcohol: Optional[AlcoholEnum] = Query(None),

    education_id: Optional[int] = Query(None),
    income_id: Optional[int] = Query(None),
    min_height: Optional[int] = Query(None),
    max_height: Optional[int] = Query(None),
    marriage_intention_id: Optional[int] = Query(None),
    holiday_id: Optional[int] = Query(None),
    meeting_preference_id: Optional[int] = Query(None),

    db: Session = Depends(get_db),
):
    query = db.query(User).options(joinedload(User.images))

    # 自分を除外
    if exclude_user_id is not None:
        query = query.filter(User.user_id != exclude_user_id)

    # 検索条件
    if min_age is not None:
        query = query.filter(User.age >= min_age)

    if max_age is not None:
        query = query.filter(User.age <= max_age)

    if birthday:
        query = query.filter(User.birthday == birthday)

    if gender:
        query = query.filter(User.gender == gender)

    if smoking:
        query = query.filter(User.smoking == smoking)

    if alcohol:
        query = query.filter(User.alcohol == alcohol)

    if current_location_id:
        query = query.filter(
            User.current_location_id == current_location_id
        )

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
        query = query.filter(
            User.marriage_intention_id == marriage_intention_id
        )

    if holiday_id:
        query = query.filter(User.holiday_id == holiday_id)

    if meeting_preference_id:
        query = query.filter(
            User.meeting_preference_id == meeting_preference_id
        )

    return query.all()


# 詳細取得
@router.get("/users/{user_id}", response_model=UserDetailResponse)
def get_user_detail(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user_data = get_user_detail_with_like(db, user_id, current_user.user_id)

    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    return user_data


# 削除
@router.delete("/user/{user_id}")
def delete(
    user_id: int,
    db: Session = Depends(get_db)
):
    delete_user(db, user_id)
    return {"message": "user delete"}


# プロフィール取得
@router.get("/user/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user)
):
    return current_user


# プロフィール更新
@router.put("/users/me", response_model=UserResponse)
def update(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = update_user(
        db,
        current_user.user_id,
        user_data
    )

    return result


# 足跡登録
@router.post("/users/{user_id}/footprint")
def create_footprint(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.user_id == user_id:
        return {"message": "自分には足跡つけません"}

    footprint = FootPrint(
        visitor_user_id=current_user.user_id,
        visited_user_id=user_id
    )

    db.add(footprint)
    db.commit()
    db.refresh(footprint)

    return footprint


# 足跡取得
@router.get("/users/me/footprint")
def get_visited_user(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_my_footprint(db, current_user.user_id)
