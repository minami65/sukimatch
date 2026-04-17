from sqlalchemy import Column,Integer,String
from app.db import Base

class Location(Base):
  __tablename__ = "current_location"
  current_location_id = Column(Integer,primary_key=True,index=True)
  current_location_name = Column(String,nullable=False)
