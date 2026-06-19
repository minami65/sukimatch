from sqlalchemy import Column,Integer,String,Date,ForeignKey, null
from app.db import Base

class Files(Base):
  __tablename__ = "files"
  file_id=Column(Integer,primary_key=True,index=False)
  owner_user_id = Column(Integer,ForeignKey("users.user_id"),nullable=False)
  file_type= Column(String,nullable=False)
  original_name = Column(String,nullable=False)
  mime_type = Column(String,nullable=True)
  size_bytes = Column(Integer,nullable=False)
  file_url = Column(String,nullable=False)
  created_at = Column(Date,nullable=False)
