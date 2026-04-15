from sqlalchemy import Column, Integer, String
from app.db import Base

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String,nullable=False)
    age = Column(Integer,nullable=False)
    mail_address = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    bio = Column(String,nullable=False)
    birth_location_id = Column(Integer,nullable=False)
    current_location_id = Column(Integer,nullable=False)
    education_id = Column(Integer,nullable=False)
    job_id = Column(Integer,nullable=False)
    income_id = Column(Integer,nullable=False)
    height = Column(Integer,nullable=False)
    marriage_intention_id = Column(Integer,nullable=False)
    holiday_id = Column(Integer,nullable=False)
    alcohol_id = Column(Integer,nullable=False)
    smoking_id = Column(Integer,nullable=False)
    living_arrangement_id = Column(Integer,nullable=False)
    meeting_preference_id = Column(Integer,nullable=False)
