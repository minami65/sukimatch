from app.db import SessionLocal
from app.models.alcohol import Alcohol

def seed_alcohol():
    db = SessionLocal()

    try:
        alcohol = ["よく飲む","飲む","少し飲む","飲まない"]
        
        if db.query(Alcohol).first():
            db.close()
            return

        for name in alcohol:
            db.add(Alcohol(alcohol_name=name))

            db.commit()
            print("  -> アルコールデータを追加しました。")
    except Exception as e:
        db.rollback()
        print(f"  -> エラーが発生しました: {e}")
    finally:
        db.close()

if __name__ == "__main__":
        seed_alcohol()
