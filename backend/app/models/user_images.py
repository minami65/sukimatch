from app.db import Base
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class UserImages(Base):
    __tablename__ = "user_images"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    image_url = Column(String)
    public_id = Column(String, nullable=False)
    sort_order = Column(Integer, nullable=False)
    user = relationship("User", back_populates="images")
