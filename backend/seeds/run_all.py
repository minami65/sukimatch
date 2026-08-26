import os
import sys

from app.db import Base, engine

from seeds.seed_images import seed_images
from seeds.seed_jobs import seed_jobs
from seeds.seed_locations import seed_locations

# from app.models.job import Job  # noqa: F401
# from app.models.likes import Likes  # noqa: F401
# from app.models.locations import Location  # noqa: F401
# from app.models.matches import Matches  # noqa: F401
# from app.models.message import Message  # noqa: F401
# from app.models.user import User  # noqa: F401
# from app.models.user_images import UserImages  # noqa: F401
from seeds.seed_matches import seed_matches
from seeds.seed_messages import seed_messages
from seeds.seed_users import seed_users

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

    print("👥 ユーザーデータを投入中...")
    seed_users()

    print("💕 マッチングデータを投入中...")
    seed_matches()

    print("🖼 画像データを投入中...")
    seed_images()

    print("🫧メッセージデータを投入中...")
    seed_messages()

    print("✨ すべてのシードデータの投入が完了しました！")


if __name__ == "__main__":
    run()
