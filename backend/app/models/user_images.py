from sqlalchemy import Column, Integer, String ,ForeignKey
from app.db import Base

class UserImages(Base):
  __tablename__ = "user_images"
  id = Column(Integer,primary_key=True,index=True)
  user_id = Column(Integer, ForeignKey("users.user_id"),nullable=False)
  image_url = Column(String)
  sort_order= Column(Integer,nullable=False)
