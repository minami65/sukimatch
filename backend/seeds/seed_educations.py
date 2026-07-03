from app.db import SessionLocal
from app.models.education import Education

def seed_educations():
  db = SessionLocal()

  try:
    educations = [
      "高校・高校卒","専門学校・専門卒","短大・短大卒","大学","大学院"
    ]

    if db.query(Education).first():
        db.close()
        return

    for name in educations:
        db.add(Education(education_name=name))

        db.commit()
        print("  -> 学歴データを追加しました。")

  except Exception as e:
    db.rollback()
    print(f"  -> エラーが発生しました: {e}")
    
  finally:
    db.close()

if __name__ == "__main__":
      seed_educations()
