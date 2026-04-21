from app.db import SessionLocal
from app.models.smoking import Smoking

def seed_smoking():
    db = SessionLocal()

    smoking = ["吸う","相手が嫌ならやめる","吸わない"]
    
    if db.query(Smoking).first():
        db.close()
        return

    for name in smoking:
        db.add(Smoking(smoking_name=name))

        db.commit()
        db.close()

if __name__ == "__main__":
        seed_smoking()
