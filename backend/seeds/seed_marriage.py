from app.db import SessionLocal
from app.models.marriage import Marriage

def seed_marriage():
    db = SessionLocal()

    try:
        marriage = ["すぐにでもしたい","2~3年のうちに","良い人がいればしたい","今はしたくない"]
        
        if db.query(Marriage).first():
            db.close()
            return

        for name in marriage:
            db.add(Marriage(marriage_intention_name=name))

            db.commit()
            print("  -> 結婚願望データを追加しました。")

    except Exception as e:
        db.rollback()
        print(f"  -> エラーが発生しました: {e}")
        
    finally:
        db.close()

if __name__ == "__main__":
        seed_marriage()
