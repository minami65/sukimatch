from typing import Annotated

import cloudinary
import cloudinary.uploader
from app.api.deps import get_current_user
from app.db import SessionLocal
from app.models.user import User
from app.models.user_images import UserImages
from cloudinary.exceptions import Error as CloudinaryError
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from pydantic import BaseModel
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session


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


DBSession = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(get_current_user)]


# プロフィールに画像追加
@router.post("/users/me/images", response_model=UserImageResponse)
def upload_image(
    db: DBSession,
    current_user: CurrentUser,
    file: Annotated[UploadFile, File()],
):
    # フォルダパスを変数化
    folder_path = f"sukimatch/users/{current_user.user_id}"

    # Cloudinaryへアップロード
    try:
        upload_result = cloudinary.uploader.upload(file.file, folder=folder_path)
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, detail=f"Cloudinary upload failed: {str(e)}"
        )

    # 返ってきたURLを取得
    image_url = upload_result.get("secure_url")

    # 【重要】後で削除するために public_id も取得しておくのがコツです
    public_id = upload_result.get("public_id")

    # データベース保存処理
    image_count = (
        db.query(UserImages).filter(UserImages.user_id == current_user.user_id).count()
    )

    user_image = UserImages(
        user_id=current_user.user_id,
        image_url=image_url,
        public_id=public_id,
        sort_order=image_count + 1,
    )
    db.add(user_image)
    db.commit()
    db.refresh(user_image)

    return user_image


# 一覧取得
@router.get("/users/{user_id}/images", response_model=list[UserImageResponse])
def get_images(user_id: int, db: DBSession):
    return db.query(UserImages).filter(UserImages.user_id == user_id).all()


# 削除
@router.delete("/users/me/images/{image_id}")
def delete_images(
    image_id: int,
    db: DBSession,
    current_user: CurrentUser,
):
    image = (
        db.query(UserImages)
        .filter(UserImages.id == image_id, UserImages.user_id == current_user.user_id)
        .first()
    )

    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    # Cloudinaryから削除
    try:
        cloudinary.uploader.destroy(image.public_id)
    except CloudinaryError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Cloudinary deletion failed: {e!s}",
        )

    # DBから削除
    db.delete(image)
    db.commit()

    return {"message": "image deleted"}
