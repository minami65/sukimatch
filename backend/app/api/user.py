from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.schemas.user import UserCreate
from app.crud.user import create_user
from app.schemas.user import UserUpdate
from app.crud.user import update_user

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.put("/users/{user_id}")
def update(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    result = update_user(db, user_id, user)

    if not result:
        return {"error": "User not found"}

    return result
