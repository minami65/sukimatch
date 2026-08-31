from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


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

    model_config = ConfigDict(
        alias_generator=to_camel,  # match_id などを matchId に自動変換
        populate_by_name=True,  # Pythonコード内からは match_id = 1 のままでも代入可能
        from_attributes=True,  # ORM (SQLAlchemy) からのモデル変換を許可
    )


class ReadResponse(BaseModel):
    updated_count: int
    message: str = "Messages marked as read"


class PartnerInfo(BaseModel):
    user_id: int
    name: str | None = None
    avatar_url: str | None = None

    model_config = ConfigDict(from_attributes=True)


class RoomMessagesResponse(BaseModel):
    partner: PartnerInfo
    messages: list[MessageResponse]

    model_config = ConfigDict(from_attributes=True)
