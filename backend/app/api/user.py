from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.schemas.user import UserCreate
from app.crud.user import create_user

router = APIRouter()
print("Customer model loaded")
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)
