from app.db import Base
from sqlalchemy import Column, Integer, String


class Location(Base):
    __tablename__ = "locations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
