from fastapi import APIRouter, UploadFile, File, Depends ,HTTPException
from sqlalchemy.orm import Session
import os
import shutil
from uuid import uuid4

from app.db import SessionLocal
from app.models.user_images import UserImages
from app.api.deps import get_current_user
from app.models.user import User
from app.models.user_images import UserImages
from pydantic import BaseModel

class UserImageResponse(BaseModel):
    id: int
    image_url: str
    sort_order: int

    class Config:
        from_attributes = True
        
router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# プロフィールに画像追加
@router.post("/users/me/images")
def upload_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    upload_dir = f"uploads/users/{current_user.user_id}"
    os.makedirs(upload_dir, exist_ok=True)

    ext = file.filename.split(".")[-1]
    filename = f"{uuid4()}.{ext}"
    file_path = f"{upload_dir}/{filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image_url = f"/{file_path}"

    image_count = (
        db.query(UserImages)
        .filter(UserImages.user_id == current_user.user_id)
        .count()
    )

    user_image = UserImages(
        user_id=current_user.user_id,
        image_url=image_url,
        sort_order = image_count + 1
    )
    db.add(user_image)
    db.commit()
    db.refresh(user_image)

    return user_image

# 一覧取得
@router.get("/users/{user_id}/images", response_model=list[UserImageResponse])
def get_images(user_id:int,db:Session = Depends(get_db)):
    return db.query(UserImages).filter(UserImages.user_id == user_id).all()

# 削除
@router.delete("/users/me/images/{image_id}")
def delete_images(
    image_id:int,
    db:Session = Depends(get_db),
    current_user:User = Depends(get_current_user)
):
    image = db.query(UserImages).filter(
        UserImages.id == image_id,
        UserImages.user_id == current_user.user_id
    ).first()

    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    file_path = image.image_url.lstrip("/")  
    file_path = f"app/{file_path}"           

    if os.path.exists(file_path):
        os.remove(file_path)

    db.delete(image)
    db.commit()

    return {"message":"image deleted"}
