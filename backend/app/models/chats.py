from sqlalchemy import Column,Integer,String,Date
from app.db import Base

class Chats(Base):
  __tablename__ = "chats"
  chat_id = Column(Integer,primary_key=True,index=True)
  chat_type= Column(String,nullable=False)
  created_at=Column(Date,nullable=False)
