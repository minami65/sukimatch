import enum

from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.db import Base


class GenderEnum(str, enum.Enum):
    FEMALE = "女性"
    MALE = "男性"
    OTHER = "答えたくない"


class SmokingEnum(str, enum.Enum):
    SMOKER = "吸う"
    STOP_IF_DISLIKED = "相手が嫌ならやめる"
    NON_SMOKER = "吸わない"


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    birthday = Column(Date, nullable=True)

    gender = Column(enum.Enum(GenderEnum), nullable=True)
    smoking = Column(enum.Enum(SmokingEnum), nullable=True)

    mail_address = Column(String, unique=True, nullable=True)
    password = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    height = Column(Integer, nullable=True)
    current_location_id = Column(Integer, ForeignKey("locations.id"))
    birth_location_id = Column(Integer, ForeignKey("locations.id"))
    birth_location = relationship(
        "Location",
        foreign_keys=[birth_location_id]
    )

    current_location = relationship(
        "Location",
        foreign_keys=[current_location_id]
    )

    education_id = Column(Integer, ForeignKey("education.education_id"))
    education = relationship("Education")

    job_id = Column(Integer, ForeignKey("job.job_id"))
    job = relationship("Job")

    income_id = Column(Integer, ForeignKey("income.income_id"))
    income = relationship("Income")

    marriage_intention_id = Column(
        Integer, ForeignKey("marriage.marriage_intention_id"))
    marriage = relationship("Marriage")

    holiday_id = Column(Integer, ForeignKey("holiday.holiday_id"))
    holiday = relationship("Holiday")

    alcohol_id = Column(Integer, ForeignKey("alcohol.alcohol_id"))
    alcohol = relationship("Alcohol")

    living_arrangement_id = Column(Integer, ForeignKey(
        "living_arrangement.living_arrangement_id"))
    living = relationship("Living")

    meeting_preference_id = Column(Integer, ForeignKey(
        "meeting_preference.meeting_preference_id"))
    meeting = relationship("Meeting")

    images = relationship("UserImages", back_populates="user")
