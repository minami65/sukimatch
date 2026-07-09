import os
import cloudinary
import cloudinary.uploader
from pathlib import Path
from app.db import SessionLocal
from app.models.user import User
from app.models.user_images import UserImages
from app.core.config import setup_cloudinary

setup_cloudinary()

def seed_images():
    db = SessionLocal()
    
    # ここに「どのユーザーにどの画像を入れるか」を定義
    # 画像ファイルは seeds/images/ 配下に配置することを想定
    image_data = [
        {"email": "taro@example.com", "subfolder": "taro", "filename": "taro-1.png"},
        {"email": "taro@example.com", "subfolder": "taro", "filename": "taro-2.png"},
        {"email": "hanako@example.com", "subfolder": "hanako", "filename": "hanako-1.png"},
        {"email": "hanako@example.com", "subfolder": "hanako", "filename": "hanako-2.png"},
        {"email": "mio@example.com", "subfolder": "mio", "filename": "mio-1.png"},
        {"email": "mio@example.com", "subfolder": "mio", "filename": "mio-2.png"},
        {"email": "yuko@example.com", "subfolder": "yuko", "filename": "yuko-1.png"},
        {"email": "yuko@example.com", "subfolder": "yuko", "filename": "yuko-2.png"},
        {"email": "hayato@example.com", "subfolder": "hayato", "filename": "hayato-1.png"},
        {"email": "hayato@example.com", "subfolder": "hayato", "filename": "hayato-2.png"},
        {"email": "hayato@example.com", "subfolder": "hayato", "filename": "hayato-3.png"},
    ]

    print("🖼 画像データのシードを開始します...")
    
    try:
        for data in image_data:
            # 1. ユーザーをメールアドレスで特定してIDを取得
            user = db.query(User).filter(User.mail_address == data["email"]).first()
            if not user:
                print(f"  -> ユーザー {data['email']} が見つかりません。スキップします。")
                continue

            # 2. 画像ファイルがあるか確認
            file_path = Path("seeds") / "images" / data["subfolder"] / data["filename"]
            if not os.path.exists(file_path):
                print(f"  -> ファイルが見つかりません: {file_path}")
                continue

            # 3. Cloudinaryへアップロード
            # folderでユーザーごとにディレクトリを分ける
            folder_path = f"sukimatch/users/{user.user_id}"
            print(f"  -> {user.name} さんの画像をアップロード中: {data['filename']}")
            
            upload_result = cloudinary.uploader.upload(str(file_path), folder=folder_path)
            
            # 4. DBに保存
            # sort_orderは現在の件数+1
            count = db.query(UserImages).filter(UserImages.user_id == user.user_id).count()
            
            new_image = UserImages(
                user_id=user.user_id,
                image_url=upload_result.get("secure_url"),
                public_id=upload_result.get("public_id"),
                sort_order=count + 1
            )
            db.add(new_image)
        
        db.commit()
        print("✨ 画像データの投入が完了しました！")
        
    except Exception as e:
        db.rollback()
        print(f"  -> 画像シード中にエラー発生: {e}")
    finally:
        db.close()