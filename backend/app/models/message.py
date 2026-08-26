import enum
from datetime import datetime, timezone

from app.db import Base
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy import Enum as SQLEnum
from sqlalchemy.orm import relationship


class ContentType(str, enum.Enum):
    TEXT = "text"
    IMAGE = "image"
    FILE = "file"


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("matches.id"), nullable=False, index=True)
    sender_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)

    content_type = Column(
        SQLEnum(ContentType, values_callable=lambda obj: [e.value for e in obj]),
        default=ContentType.TEXT,
        nullable=False,
    )

    content = Column(Text, nullable=False)

    is_read = Column(Boolean, default=False, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True,
    )

    # リレーション
    match = relationship("Matches")
    sender = relationship("User")
