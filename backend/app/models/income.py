from sqlalchemy import Column,Integer,String
from app.db import Base

class Income(Base):
  __tablename__ = "income"
  income_id = Column(Integer,primary_key=True,index=True)
  income_name = Column(String,nullable=False)
