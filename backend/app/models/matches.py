from app.db import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer
from sqlalchemy.orm import relationship


class Matches(Base):
    __tablename__ = "matches"
    id = Column(Integer, primary_key=True, index=True)
    user1_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    user2_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)

    user1_checked_match = Column(Boolean, default=False, nullable=False)
    user2_checked_match = Column(Boolean, default=False, nullable=False)

    # foreign_keys を文字列ではなくカラムオブジェクト直接、または明確に参照指定する
    user1 = relationship("User", foreign_keys="[Matches.user1_id]")
    user2 = relationship("User", foreign_keys="[Matches.user2_id]")
