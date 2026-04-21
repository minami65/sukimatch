from sqlalchemy import Column, Integer, String,ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String,nullable=False)
    age = Column(Integer,nullable=False)
    mail_address = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    bio = Column(String,nullable=False)
    height = Column(Integer,nullable=False)
    current_location_id = Column(Integer, ForeignKey("locations.id"))
    birth_location_id = Column(Integer,ForeignKey("locations.id"))
    birth_location = relationship(
        "Location",
        foreign_keys=[birth_location_id]
    )

    current_location = relationship(
        "Location",
        foreign_keys=[current_location_id]
    )
    # 外部キー
    birth = relationship("Birth")


    education_id = Column(Integer,ForeignKey("education.education_id"))
    education = relationship("Education")

    job_id = Column(Integer,ForeignKey("job.job_id"))
    job = relationship("Job")

    income_id = Column(Integer,ForeignKey("income.income_id"))
    income = relationship("Income")
    
    marriage_intention_id = Column(Integer,ForeignKey("marriage.marriage_intention_id"))
    marriage = relationship("Marriage")

    holiday_id = Column(Integer,ForeignKey("holiday.holiday_id"))
    holiday = relationship("Holiday")

    alcohol_id = Column(Integer,ForeignKey("alcohol.alcohol_id"))
    alcohol = relationship("Alcohol")

    smoking_id = Column(Integer,ForeignKey("smoking.smoking_id"))
    smoking = relationship("Smoking")

    living_arrangement_id = Column(Integer,ForeignKey("living_arrangement.living_arrangement_id"))
    living = relationship("Living")

    meeting_preference_id = Column(Integer,ForeignKey("meeting_preference.meeting_preference_id"))
    meeting = relationship("Meeting")

    

    