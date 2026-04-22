from sqlalchemy.orm import Session
from app.models.income import Income

def get_income(db:Session):
  return db.query(Income).all()
