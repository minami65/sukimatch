from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.schemas.user import UserCreate
from app.crud.user import create_user
from app.schemas.user import UserUpdate
from app.crud.user import update_user
from app.crud.user import get_users
from app.crud.user import get_user
from app.schemas.user import UserResponse

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
def get_user_list(db:Session = Depends(get_db)):
    return get_users(db)

# 詳細取得
@router.get("/users/{user_id}",response_model=UserResponse)
def get_user_detail(user_id: int,db:Session = Depends(get_db)):
    user = get_user(db,user_id)

    if not user:
        return {"error":"User not found"}
    return user

# 検索

# 削除
