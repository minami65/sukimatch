from app.db import SessionLocal
from app.models.matches import Matches
from app.models.user import User
from sqlalchemy.exc import SQLAlchemyError


def seed_matches():
    db = SessionLocal()
    try:
        # ユーザーが少なくとも2人以上存在するか確認
        users = db.query(User).limit(2).all()
        if len(users) < 2:
            print("❌ ユーザーが2名以上存在しないため、マッチングを作成できません。")
            return

        user1_id = users[0].user_id
        user2_id = users[1].user_id

        # すでにマッチデータが存在するか確認
        existing_match = (
            db.query(Matches)
            .filter(Matches.user1_id == user1_id, Matches.user2_id == user2_id)
            .first()
        )

        if not existing_match:
            new_match = Matches(
                user1_id=user1_id,
                user2_id=user2_id,
                user1_checked_match=True,
                user2_checked_match=True,
            )
            db.add(new_match)
            db.commit()
            print(
                f"✅ マッチングデータを作成しました (ID: 1, User {user1_id} ↔ User {user2_id})"
            )
        else:
            print("ℹ️ マッチングデータは既に存在します")

    except SQLAlchemyError as e:
        db.rollback()
        print(f"❌ マッチング作成中にエラーが発生しました: {e!s}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_matches()
