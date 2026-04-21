from sqlalchemy import Column,Integer,String
from app.db import Base

class Location(Base):
  __tablename__ = "locations"
  id = Column(Integer,primary_key=True,index=True)
  name = Column(String,nullable=False)
