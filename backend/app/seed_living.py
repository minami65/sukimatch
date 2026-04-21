from app.db import SessionLocal
from app.models.living_arrangement import Living

def seed_living():
    db = SessionLocal()

    living = ["一人暮らし","実家","ルームシェア","友人","その他"]
    
    if db.query(Living).first():
        db.close()
        return

    for name in living:
        db.add(Living(living_arrangement_name=name))

        db.commit()
        db.close()

if __name__ == "__main__":
        seed_living()
