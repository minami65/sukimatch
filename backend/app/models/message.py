from sqlalchemy import Column,Integer,String,ForeignKey,Date
from app.db import Base

class Message(Base):
  __tablename__ = "message"
  message_id = Column(Integer,primary_key=True,index=True)
  chat_id=Column(Integer,ForeignKey("chats.chat_id"),nullable=False)
  sender_user_id = Column(Integer,ForeignKey("users.user_id"),nullable=False)
  message_type = Column(String,nullable=False)
  body = Column(String,nullable=True)
  attachment_file_id = Column(Integer,ForeignKey("files.file_id"),nullable=True)
  sent_at = Column(Date,nullable=False)
  created_at = Column(Date,nullable=False)
