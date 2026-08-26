from pathlib import Path

import cloudinary
import cloudinary.uploader
from app.core.config import setup_cloudinary
from app.db import SessionLocal
from app.models.user import User
from app.models.user_images import UserImages
from sqlalchemy.exc import SQLAlchemyError

setup_cloudinary()


def seed_images():
    db = SessionLocal()

    print("🧹 古い画像データをデータベースから削除しています...")
    try:
        db.query(UserImages).delete()
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()
        print(f"  -> 古いデータの削除中にエラーが発生しました: {e}")
        db.close()
        return

    print("🖼 画像データのシード（全自動スキャン）を開始します...")

    # 画像が置かれているベースディレクトリ
    base_dir = Path("seeds") / "images"

    if not base_dir.exists():
        print(f"❌ ベースフォルダが見つかりません: {base_dir}")
        db.close()
        return

    try:
        # 1. seeds/images/ 配下のフォルダ（taro, hanakoなど）を自動ループ
        for user_folder in base_dir.iterdir():
            if not user_folder.is_dir():
                continue  # ファイル（.DS_Storeなど）はスキップ

            subfolder_name = user_folder.name  # 例: "taro"

            # 2. フォルダ名からメールアドレスを予想してユーザーを特定
            # もしフォルダ名をそのまま「taro@example.com」にするなら user_folder.name でOK
            email = f"{subfolder_name}@example.com"
            user = db.query(User).filter(User.mail_address == email).first()

            if not user:
                print(
                    f"  -> フォルダ名 '{subfolder_name}' に対応するユーザー ({email}) が見つかりません。スキップします。"
                )
                continue

            # 3. ユーザーのフォルダ内にある画像ファイルを自動で全取得
            # 対応する拡張子: .png, .jpg, .jpeg, .webp
            valid_extensions = {".png", ".jpg", ".jpeg", ".webp", ".PNG", ".JPG"}
            image_files = [
                f
                for f in user_folder.iterdir()
                if f.is_file() and f.suffix in valid_extensions
            ]

            if not image_files:
                print(f"  -> {user.name} さんのフォルダ内に画像がありません。")
                continue

            print(
                f"👤 {user.name} さんの画像を {len(image_files)} 件検出しました。アップロードを開始します..."
            )

            # 4. 見つかった画像をループしてアップロード
            for file_path in image_files:
                folder_path = f"sukimatch/users/{user.user_id}"
                print(f"  -> {file_path.name} をアップロード中...")

                upload_result = cloudinary.uploader.upload(
                    str(file_path), folder=folder_path
                )

                # sort_orderの計算
                count = (
                    db.query(UserImages)
                    .filter(UserImages.user_id == user.user_id)
                    .count()
                )

                new_image = UserImages(
                    user_id=user.user_id,
                    image_url=upload_result.get("secure_url"),
                    public_id=upload_result.get("public_id"),
                    sort_order=count + 1,
                )
                db.add(new_image)

            # ユーザーごとにこまめにコミット
            db.commit()

        print("✨ すべての画像データの自動投入が完了しました！")

    except SQLAlchemyError as e:
        db.rollback()
        print(f"  -> 画像シード中にエラー発生: {e}")
    finally:
        db.close()
