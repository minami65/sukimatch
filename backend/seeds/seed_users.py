from datetime import date
from app.db import SessionLocal
from app.models.user import User

def seed_users():
    db = SessionLocal()

    try:
        test_users = [
            User(
                name="テスト 太郎",
                age=25,
                birthday=date(1999, 1, 1),
                gender_id=1,
                mail_address="taro@example.com",
                password="password123",
                bio="初めまして！週末はよく映画を見ています。よろしくお願いします。",
                height=170,
                current_location_id=13,
                birth_location_id=14,
                education_id=4,
                job_id=1,
                income_id=3,
                marriage_intention_id=1,
                holiday_id=1,
                alcohol_id=1,
                smoking_id=4,
                living_arrangement_id=1,
                meeting_preference_id=1
            ),
            User(
                name="テスト 花子",
                age=23,
                birthday=date(2001, 5, 5),
                gender_id=2,
                mail_address="hanako@example.com",
                password="password123",
                bio="カフェ巡りと旅行が好きです！美味しいご飯を食べに行きたいです。",
                height=158,
                current_location_id=13,
                birth_location_id=1,
                education_id=3,
                job_id=2,
                income_id=2,
                marriage_intention_id=2,
                holiday_id=2,
                alcohol_id=3,
                smoking_id=4,
                living_arrangement_id=2,
                meeting_preference_id=2
            ),
            User(
                name="テスト ミオ",
                age=29,
                birthday=date(1997, 1, 31),
                gender_id=2,
                mail_address="mio@example.com",
                password="password123",
                bio="嵐が好きです！",
                height=160,
                current_location_id=4,
                birth_location_id=4,
                education_id=2,
                job_id=3,
                income_id=2,
                marriage_intention_id=2,
                holiday_id=2,
                alcohol_id=3,
                smoking_id=4,
                living_arrangement_id=2,
                meeting_preference_id=2
            ),
            User(
                name="テスト ハヤト",
                age=28,
                birthday=date(1997, 4, 11),
                gender_id=2,
                mail_address="hayato@example.com",
                password="password123",
                bio="筋トレ大好きです！筋肉愛しています！",
                height=171,
                current_location_id=5,
                birth_location_id=5,
                education_id=3,
                job_id=2,
                income_id=2,
                marriage_intention_id=2,
                holiday_id=2,
                alcohol_id=3,
                smoking_id=4,
                living_arrangement_id=2,
                meeting_preference_id=2
            ),
            User(
                name="テスト ユウコ",
                age=30,
                birthday=date(1996, 3, 23),
                gender_id=2,
                mail_address="yuko@example.com",
                password="password123",
                bio="女優やってます！",
                height=169,
                current_location_id=13,
                birth_location_id=1,
                education_id=3,
                job_id=3,
                income_id=4,
                marriage_intention_id=1,
                holiday_id=1,
                alcohol_id=2,
                smoking_id=4,
                living_arrangement_id=2,
                meeting_preference_id=2
            ),
        ]

        added_count = 0
        for user_data in test_users:
            exists = db.query(User).filter(User.mail_address == user_data.mail_address).first()
            
            if not exists:
                db.add(user_data)
                added_count += 1
                print(f"  -> {user_data.name} さんを追加しました。")

        if added_count > 0:
            db.commit()
            print(f"✨ 新たに {added_count} 名のテストユーザーデータを保存しました。")
        else:
            print("  -> すべてのユーザーが既に存在するため、追加をスキップしました。")

    except Exception as e:
        db.rollback() 
        print(f"  -> エラーが発生しました: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_users()