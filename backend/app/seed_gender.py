from app.db import SessionLocal
from app.models.gender import Gender

def seed_gender():
  db = SessionLocal()

  jobs = [
    "女性","男性","答えたくない"
  ]

  if db.query(Gender).first():
      db.close()
      return

  for name in jobs:
      db.add(Gender(gender_name=name))

      db.commit()
      db.close()

if __name__ == "__main__":
      seed_gender()
