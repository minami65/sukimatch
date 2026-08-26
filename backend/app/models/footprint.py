from app.db import Base
from sqlalchemy import Column, Integer


class FootPrint(Base):
    __tablename__ = "footprint"
    footprint_id = Column(Integer, primary_key=True, index=True)
    visitor_user_id = Column(Integer, nullable=False)
    visited_user_id = Column(Integer, nullable=False)
