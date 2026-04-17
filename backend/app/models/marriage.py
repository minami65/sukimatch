from sqlalchemy import Column,Integer,String
from app.db import Base

class Marriage(Base):
  __tablename__ = "marriage"
  marriage_intention_id = Column(Integer,primary_key=True,index=True)
  marriage_intention_name= Column(String,nullable=False)
