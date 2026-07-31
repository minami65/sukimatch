from app.models.matches import Matches
from app.models.likes import Likes
from app.models.user_images import UserImages
from app.models.job import Job
from app.models.locations import Location
from app.models.user import User
from seeds.seed_images import seed_images
from seeds.seed_users import seed_users
from seeds.seed_locations import seed_locations
from seeds.seed_jobs import seed_jobs
from app.db import engine, Base
import os
import sys

# パスが通らない問題を力技で解決（backendディレクトリを検索パスに追加）
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


# ここで全モデルをインポートして、SQLAlchemyにテーブルの存在を教える


def run():
    print("🔄 データベースを初期化中...")
    Base.metadata.create_all(bind=engine)

    print("💻仕事データを投入中")
    seed_jobs()

    print("🇯🇵都道府県データを投入中")
    seed_locations()

    # 一番最後にユーザーを入れる
    print("👥 ユーザーデータを投入中...")
    seed_users()

    print("🖼 画像データを投入中...")
    seed_images()

    print("✨ すべてのシードデータの投入が完了しました！")


if __name__ == "__main__":
    run()
