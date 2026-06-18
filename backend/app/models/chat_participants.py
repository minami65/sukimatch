from sqlalchemy import Column,Integer,ForeignKey,Date
from app.db import Base

class ChatParticipants(Base):
  __tablename__ = "chat_participants"
  id=Column(Integer,primary_key=True,index=True)
  chat_id=Column(Integer,ForeignKey("chats.chat_id"),nullable=False)
  user_id=Column(Integer,ForeignKey("users.user_id"),nullable=False)
  joined_at=Column(Date,nullable=False)
