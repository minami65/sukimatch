from sqlalchemy import Column, Integer, String
from app.db import Base

class UserImages(Base):
  __tablename__ = "user_images"
  user_id = Column(Integer,primary_key=True,index=True)
  image_url = Column(String)
  sort_order= Column(Integer,nullable=False)
