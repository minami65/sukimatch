from sqlalchemy import Column,Integer,String
from app.db import Base

class Alcohol(Base):
  __tablename__ = "alcohol"
  alcohol_id = Column(Integer,primary_key=True,index=True)
  alcohol_name = Column(String,nullable=False)
  
