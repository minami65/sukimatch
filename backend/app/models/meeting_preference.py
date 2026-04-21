from sqlalchemy import Column,Integer,String
from app.db import Base

class Meeting(Base):
  __tablename__ = "meeting_preference"
  meeting_preference_id= Column(Integer,primary_key=True,index=True)
  meeting_preference_name = Column(String,nullable=False)
