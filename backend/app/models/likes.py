from sqlalchemy import Column, Integer, String
from app.db import Base

class Likes(Base):
    __tablename__ = "likes"
    id = Column(Integer,primary_key=True,index=True)
    from_user_id = Column(Integer,nullable=False)
    to_user_id = Column(Integer,nullable=False)
