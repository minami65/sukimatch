from sqlalchemy import Column,Integer,String
from app.db import Base

class Smoking(Base):
  __tablename__ = "smoking"
  smoking_id= Column(Integer,primary_key=True,index=True)
  smoking_name = Column(String,nullable=False)
