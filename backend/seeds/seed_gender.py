from app.db import SessionLocal
from app.models.gender import Gender

def seed_gender():
  db = SessionLocal()

  try:
    genders = [
      "女性","男性","答えたくない"
    ]

    if db.query(Gender).first():
        db.close()
        return

    for name in genders:
        db.add(Gender(gender_name=name))

        db.commit()
        print("  -> 性別データを追加しました。")

  except Exception as e:
    db.rollback()
    print(f"  -> エラーが発生しました: {e}")
    
  finally:
    db.close()


if __name__ == "__main__":
      seed_gender()
