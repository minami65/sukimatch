from app.db import SessionLocal
from app.models.holiday import Holiday

def seed_holiday():
    db = SessionLocal()

    try:
        holiday = ["平日休み","土日休み","不定期"]
        
        if db.query(Holiday).first():
            db.close()
            return

        for name in holiday:
            db.add(Holiday(holiday_name=name))

            db.commit()
            print("  -> 休暇データを追加しました。")

    except Exception as e:
        db.rollback()
        print(f"  -> エラーが発生しました: {e}")

    finally:
        db.close()


if __name__ == "__main__":
        seed_holiday()
