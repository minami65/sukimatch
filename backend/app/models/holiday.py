from sqlalchemy import Column,Integer,String
from app.db import Base

class Holiday(Base):
  __tablename__ = "holiday"
  holiday_id = Column(Integer,primary_key=True,index=True)
  holiday_name = Column(String,nullable=False)
