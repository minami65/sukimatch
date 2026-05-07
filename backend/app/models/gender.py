from sqlalchemy import Column,Integer,String
from app.db import Base

class Gender(Base):
  __tablename__ = "gender"
  gender_id = Column(Integer,primary_key=True,index=True)
  gender_name = Column(String,nullable=False)
