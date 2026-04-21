from app.db import SessionLocal
from app.models.income import Income

def seed_income():
    db = SessionLocal()

    incomes = ["200万以下","200~400万","400~600万","600~800万","800~1000万","1000万以上"]
    
    if db.query(Income).first():
        db.close()
        return

    for name in incomes:
        db.add(Income(income_name=name))

        db.commit()
        db.close()

if __name__ == "__main__":
        seed_income()
