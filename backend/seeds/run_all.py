from app.models.matches import Matches
from app.models.likes import Likes
from app.models.user_images import UserImages
from app.models.meeting_preference import Meeting
from app.models.living_arrangement import Living
from app.models.smoking import Smoking
from app.models.alcohol import Alcohol
from app.models.holiday import Holiday
from app.models.marriage import Marriage
from app.models.income import Income
from app.models.job import Job
from app.models.education import Education
from app.models.locations import Location
from app.models.user import User
from seeds.seed_images import seed_images
from seeds.seed_users import seed_users
from seeds.seed_smoking import seed_smoking
from seeds.seed_meeting import seed_meeting
from seeds.seed_marriage import seed_marriage
from seeds.seed_locations import seed_locations
from seeds.seed_living import seed_living
from seeds.seed_jobs import seed_jobs
from seeds.seed_income import seed_income
from seeds.seed_holiday import seed_holiday
from seeds.seed_educations import seed_educations
from seeds.seed_alcohol import seed_alcohol
from app.db import engine, Base
import os
import sys

# パスが通らない問題を力技で解決（backendディレクトリを検索パスに追加）
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


# ここで全モデルをインポートして、SQLAlchemyにテーブルの存在を教える


def run():
    print("🔄 データベースを初期化中...")
    Base.metadata.create_all(bind=engine)

    print("🍺アルコールデータを投入中")
    seed_alcohol()

    print("🎓学歴データを投入中")
    seed_educations()

    print("🏝休暇データを投入中")
    seed_holiday()

    print("💰収入データを投入中")
    seed_income()

    print("💻仕事データを投入中")
    seed_jobs()

    print("🏠生活環境データを投入中")
    seed_living()

    print("🇯🇵都道府県データを投入中")
    seed_locations()

    print("💒結婚願望データを投入中")
    seed_marriage()

    print("☕️会う願望データを投入中")
    seed_meeting()

    print("🚬喫煙データを投入中")
    seed_smoking()

    # 一番最後にユーザーを入れる
    print("👥 ユーザーデータを投入中...")
    seed_users()

    print("🖼 画像データを投入中...")
    seed_images()

    print("✨ すべてのシードデータの投入が完了しました！")


if __name__ == "__main__":
    run()
