from app.models.user_images import UserImages
from app.core.config import setup_cloudinary
from sqlalchemy.orm import Session, joinedload
from app.models.user import User
from passlib.context import CryptContext
from fastapi import HTTPException, UploadFile
import cloudinary
import cloudinary.uploader

setup_cloudinary()

# パスワードのハッシュ化
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 登録


def create_user(db: Session, user):
    print("password:", user.password)
    hashed_password = pwd_context.hash(user.password)
    print("hashed_password", hashed_password)

    db_user = User(
        name=user.name,
        age=user.age,
        birthday=user.birthday,
        mail_address=user.mail_address,
        password=hashed_password,
        bio=user.bio,
        gender_id=user.gender_id,
        birth_location_id=user.birth_location_id,
        current_location_id=user.current_location_id,
        education_id=user.education_id,
        job_id=user.job_id,
        income_id=user.income_id,
        height=user.height,
        marriage_intention_id=user.marriage_intention_id,
        holiday_id=user.holiday_id,
        alcohol_id=user.alcohol_id,
        smoking_id=user.smoking_id,
        living_arrangement_id=user.living_arrangement_id,
        meeting_preference_id=user.meeting_preference_id
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

# 更新


def update_user(
    db: Session,
    user_id: int,
    user_data: dict,                # テキスト系の更新値が入った辞書
    keep_image_ids: list[int],      # 残したい画像のID配列 [1, 2]
    new_images: list[UploadFile]    # アップロードされた画像ファイル配列
):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        return None

    # 1. テキスト・Enumカラムを一括更新 (None以外のものだけ)
    for field, value in user_data.items():
        if value is not None:
            setattr(user, field, value)

    # 削除処理
    images_to_delete = db.query(UserImages).filter(
        UserImages.user_id == user_id,
        UserImages.id.not_in(keep_image_ids) if keep_image_ids else True
    ).all()

    for img in images_to_delete:
        # ① Cloudinary から物理削除
        if img.public_id:
            try:
                cloudinary.uploader.destroy(img.public_id)
            except Exception as e:
                print(f"Cloudinaryからの削除エラー: {e}")

        # ② DBからレコード削除
        db.delete(img)

    # 新規追加処理
    folder_path = f"sukimatch/users/{user_id}"

    for file in new_images:
        if not file.filename:
            continue

        # ① Cloudinary へアップロード (UploadFile.file をそのまま渡す)
        upload_result = cloudinary.uploader.upload(
            file.file,
            folder=folder_path
        )

        # ② sort_order の計算（シードコードと同じロジック）
        current_count = db.query(UserImages).filter(
            UserImages.user_id == user_id
        ).count()

        # ③ DBに新規レコード登録
        new_image_record = UserImages(
            user_id=user_id,
            image_url=upload_result.get("secure_url"),
            public_id=upload_result.get("public_id"),
            sort_order=current_count + 1
        )
        db.add(new_image_record)

    # 3. DBへコミットして確定
    db.commit()
    db.refresh(user)

    return user

# 一覧参照


def get_users(db: Session):
    return db.query(User).all()

# 詳細取得


def get_user(db: Session, user_id: int):
    return (
        db.query(User)
        .options(joinedload(User.images))
        .filter(User.user_id == user_id)
        .first()
    )

# 検索


def search_user(db: Session,):
    return db.query(User).filter().all()

# 削除


def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.user_id == user_id).first()

    if user is None:
        return None

    db.delete(user)
    db.commit()
    return user

# メールアドレスが一致するユーザーの取得


def get_user_by_mail_address(db: Session, mail_address: str):
    return db.query(User).filter(User.mail_address == mail_address).first()

# パスワードリセット


def password_reset(db: Session, mail_address: str, password: str):
    user = db.query(User).filter(User.mail_address == mail_address).first()
    if not user:
        raise HTTPException(status_code=404, detail="ユーザーが存在しません")
    user.password = pwd_context.hash(password)

    db.commit()
    db.refresh(user)
    return user
