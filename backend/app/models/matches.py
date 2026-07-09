from sqlalchemy import Column, Integer, String, Boolean
from app.db import Base

class Matches(Base):
    __tablename__ = "matches"
    id=Column(Integer,primary_key=True,index=True)
    user1_id = Column(Integer,nullable=False)
    user2_id= Column(Integer,nullable=False)
    is_chat_started = Column(Boolean, default=False, nullable=False)