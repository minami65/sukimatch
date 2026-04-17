from sqlalchemy import Column,Integer,String
from app.db import Base

class Birth(Base):
  __tablename__ = "birth_location"
  birth_location_id = Column(Integer,primary_key=True,index=True)
  birth_location_name = Column(String,nullable=False)
