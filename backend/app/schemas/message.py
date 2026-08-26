from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict


class ContentType(str, Enum):
    TEXT = "text"
    IMAGE = "image"
    FILE = "file"


class SenderSchema(BaseModel):
    user_id: int
    name: str | None = None

    model_config = ConfigDict(from_attributes=True)


class MessageResponse(BaseModel):
    id: int
    match_id: int
    sender_id: int
    content_type: str
    content: str
    is_read: bool
    created_at: datetime
    sender: SenderSchema

    model_config = ConfigDict(from_attributes=True)


class MessageCreate(BaseModel):
    content_type: ContentType = ContentType.TEXT
    content: str


class TalkListItem(BaseModel):
    match_id: int
    partner_id: int
    partner_name: str
    partner_icon_url: str | None = None  # アイコン画像があれば
    latest_message: str | None = None  # メッセージがまだない場合は None
    latest_message_at: datetime | None = None
    unread_count: int = 0

    class Config:
        from_attributes = True


class ReadResponse(BaseModel):
    updated_count: int
    message: str = "Messages marked as read"
