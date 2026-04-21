from sqlalchemy import Column,Integer,String
from app.db import Base

class Education(Base):
  __tablename__ = "education"
  education_id = Column(Integer,primary_key=True,index=True)
  education_name = Column(String,nullable=False)
