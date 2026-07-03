from app.db import SessionLocal
from app.models.meeting_preference import Meeting

def seed_meeting():
    db = SessionLocal()

    try:
        meeting = ["マッチング後、まずは会いたい","気が合えば会いたい","メッセージを重ねてから会いたい"]
        
        if db.query(Meeting).first():
            db.close()
            return

        for name in meeting:
            db.add(Meeting(meeting_preference_name=name))

            db.commit()
            print("  -> 会う願望データを追加しました。")

    except Exception as e:
        db.rollback()
        print(f"  -> エラーが発生しました: {e}")

    finally:
        db.close()

if __name__ == "__main__":
        seed_meeting()
