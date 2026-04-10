from sqlalchemy import Column, Integer, String
from app.db import Base

print("🔥 Customer model loaded")
class Customer(Base):
    __tablename__ = "customers"
    id = Column(Integer, primary_key=True, index=True)
    nickname = Column(String, nullable=False)
    mail_address = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
