from datetime import date

from app.core.security import hash_password
from app.db import SessionLocal
from app.models.user import (
    AlcoholEnum,
    EducationEnum,
    GenderEnum,
    HolidayEnum,
    IncomeEnum,
    LivingArrangementEnum,
    MarriageIntentionEnum,
    MeetingPreferenceEnum,
    SmokingEnum,
    User,
)
from sqlalchemy.exc import SQLAlchemyError


def seed_users():
    db = SessionLocal()

    try:
        test_users = [
            User(
                name="テスト 太郎",
                age=25,
                birthday=date(1999, 1, 1),
                gender=GenderEnum.MALE,
                mail_address="taro@example.com",
                password=hash_password("password123"),
                bio="初めまして！週末はよく映画を見ています。よろしくお願いします。",
                height=170,
                current_location_id=13,
                birth_location_id=14,
                education=EducationEnum.UNIVERSITY,
                job_id=1,
                income=IncomeEnum.FROM_4M_TO_6M,
                marriage_intention=MarriageIntentionEnum.ASAP,
                holiday=HolidayEnum.WEEKDAY,
                alcohol=AlcoholEnum.HEAVY,
                smoking=SmokingEnum.NON_SMOKER,
                living_arrangement=LivingArrangementEnum.ALONE,
                meeting_preference=MeetingPreferenceEnum.WANT_TO_MEET,
            ),
            User(
                name="テスト 花子",
                age=23,
                birthday=date(2001, 5, 5),
                gender=GenderEnum.FEMALE,
                mail_address="hanako@example.com",
                password=hash_password("password123"),
                bio="カフェ巡りと旅行が好きです！美味しいご飯を食べに行きたいです。",
                height=158,
                current_location_id=13,
                birth_location_id=1,
                education=EducationEnum.JUNIOR_COLLEGE,
                job_id=2,
                income=IncomeEnum.FROM_2M_TO_4M,
                marriage_intention=MarriageIntentionEnum.WITHIN_FEW_YEARS,
                holiday=HolidayEnum.WEEKEND,
                alcohol=AlcoholEnum.LIGHT,
                smoking=SmokingEnum.NON_SMOKER,
                living_arrangement=LivingArrangementEnum.FAMILY,
                meeting_preference=MeetingPreferenceEnum.IF_MATCHES,
            ),
            User(
                name="テスト ミオ",
                age=29,
                birthday=date(1997, 1, 31),
                gender=GenderEnum.FEMALE,
                mail_address="mio@example.com",
                password=hash_password("password123"),
                bio="嵐が好きです！",
                height=160,
                current_location_id=4,
                birth_location_id=4,
                education=EducationEnum.VOCATIONAL,
                job_id=3,
                income=IncomeEnum.FROM_2M_TO_4M,
                marriage_intention=MarriageIntentionEnum.WITHIN_FEW_YEARS,
                holiday=HolidayEnum.WEEKEND,
                alcohol=AlcoholEnum.LIGHT,
                smoking=SmokingEnum.NON_SMOKER,
                living_arrangement=LivingArrangementEnum.FAMILY,
                meeting_preference=MeetingPreferenceEnum.IF_MATCHES,
            ),
            User(
                name="テスト ハヤト",
                age=28,
                birthday=date(1997, 4, 11),
                gender=GenderEnum.MALE,  # 男性に変更
                mail_address="hayato@example.com",
                password=hash_password("password123"),
                bio="筋トレ大好きです！筋肉愛しています！",
                height=171,
                current_location_id=5,
                birth_location_id=5,
                education=EducationEnum.JUNIOR_COLLEGE,
                job_id=2,
                income=IncomeEnum.FROM_2M_TO_4M,
                marriage_intention=MarriageIntentionEnum.WITHIN_FEW_YEARS,
                holiday=HolidayEnum.WEEKEND,
                alcohol=AlcoholEnum.LIGHT,
                smoking=SmokingEnum.NON_SMOKER,
                living_arrangement=LivingArrangementEnum.FAMILY,
                meeting_preference=MeetingPreferenceEnum.IF_MATCHES,
            ),
            User(
                name="テスト ユウコ",
                age=30,
                birthday=date(1996, 3, 23),
                gender=GenderEnum.FEMALE,
                mail_address="yuko@example.com",
                password=hash_password("password123"),
                bio="女優やってます！",
                height=169,
                current_location_id=13,
                birth_location_id=1,
                education=EducationEnum.JUNIOR_COLLEGE,
                job_id=3,
                income=IncomeEnum.FROM_6M_TO_8M,
                marriage_intention=MarriageIntentionEnum.ASAP,
                holiday=HolidayEnum.WEEKDAY,
                alcohol=AlcoholEnum.REGULAR,
                smoking=SmokingEnum.NON_SMOKER,
                living_arrangement=LivingArrangementEnum.FAMILY,
                meeting_preference=MeetingPreferenceEnum.IF_MATCHES,
            ),
        ]
        added_count = 0
        for user_data in test_users:
            exists = (
                db.query(User)
                .filter(User.mail_address == user_data.mail_address)
                .first()
            )

            if not exists:
                db.add(user_data)
                added_count += 1
                print(f"  -> {user_data.name} さんを追加しました。")

        if added_count > 0:
            db.commit()
            print(f"✨ 新たに {added_count} 名のテストユーザーデータを保存しました。")
        else:
            print("  -> すべてのユーザーが既に存在するため、追加をスキップしました。")

    except SQLAlchemyError as e:
        db.rollback()
        print(f"  -> エラーが発生しました: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_users()
