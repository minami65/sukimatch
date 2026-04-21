from sqlalchemy import Column,Integer,String
from app.db import Base

class Living(Base):
  __tablename__ = "living_arrangement"
  living_arrangement_id= Column(Integer,primary_key=True,index=True)
  living_arrangement_name = Column(String,nullable=False)
