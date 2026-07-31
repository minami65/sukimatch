
import enum

from sqlalchemy import Column, Integer, String, ForeignKey, Date, Enum
from sqlalchemy.orm import relationship
from app.db import Base


class GenderEnum(str, enum.Enum):
    FEMALE = "女性"
    MALE = "男性"
    OTHER = "答えたくない"


class SmokingEnum(str, enum.Enum):
    SMOKER = "吸う"
    STOP_IF_DISLIKED = "相手が嫌ならやめる"
    NON_SMOKER = "吸わない"


class AlcoholEnum(str, enum.Enum):
    HEAVY = "よく飲む"
    REGULAR = "飲む"
    LIGHT = "少し飲む"
    NON_DRINKER = "飲まない"


class MarriageIntentionEnum(str, enum.Enum):
    ASAP = "すぐにでもしたい"
    WITHIN_FEW_YEARS = "2~3年のうちに"
    IF_GOOD_PERSON = "良い人がいればしたい"
    NOT_NOW = "今はしたくない"


class MeetingPreferenceEnum(str, enum.Enum):
    WANT_TO_MEET = "マッチング後、まずは会いたい"
    IF_MATCHES = "気が合えば会いたい"
    AFTER_MESSAGES = "メッセージを重ねてから会いたい"


class LivingArrangementEnum(str, enum.Enum):
    ALONE = "一人暮らし"
    FAMILY = "実家"
    ROOMSHARE = "ルームシェア"
    FRIEND = "友人"
    OTHER = "その他"


class EducationEnum(str, enum.Enum):
    HIGH_SCHOOL = "高校・高校卒"
    VOCATIONAL = "専門学校・専門卒"
    JUNIOR_COLLEGE = "短大・短大卒"
    UNIVERSITY = "大学"
    GRADUATE_SCHOOL = "大学院"


class IncomeEnum(str, enum.Enum):
    UNDER_2M = "200万以下"
    FROM_2M_TO_4M = "200~400万"
    FROM_4M_TO_6M = "400~600万"
    FROM_6M_TO_8M = "600~800万"
    FROM_8M_TO_10M = "800~1000万"
    OVER_10M = "1000万以上"


class HolidayEnum(str, enum.Enum):
    WEEKDAY = "平日休み"
    WEEKEND = "土日休み"
    IRREGULAR = "不定期"


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True)
    age = Column(Integer, nullable=True)
    birthday = Column(Date, nullable=True)
    mail_address = Column(String, unique=True, nullable=True)
    password = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    height = Column(Integer, nullable=True)

    # === Enum カラム群 ===
    gender = Column(Enum(GenderEnum, native_enum=False), nullable=True)
    smoking = Column(Enum(SmokingEnum, native_enum=False), nullable=True)
    alcohol = Column(Enum(AlcoholEnum, native_enum=False), nullable=True)
    marriage_intention = Column(
        Enum(MarriageIntentionEnum, native_enum=False), nullable=True)
    meeting_preference = Column(
        Enum(MeetingPreferenceEnum, native_enum=False), nullable=True)
    living_arrangement = Column(
        Enum(LivingArrangementEnum, native_enum=False), nullable=True)
    education = Column(Enum(EducationEnum, native_enum=False), nullable=True)
    income = Column(Enum(IncomeEnum, native_enum=False), nullable=True)
    holiday = Column(Enum(HolidayEnum, native_enum=False), nullable=True)

    # === マスタテーブル（ID参照）に残す項目 ===
    birth_location_id = Column(
        Integer, ForeignKey("locations.id"), nullable=True)
    current_location_id = Column(
        Integer, ForeignKey("locations.id"), nullable=True)
    job_id = Column(Integer, ForeignKey("jobs.id"), nullable=True)

    # リレーション（マスタ参照のみ残す）
    current_location = relationship(
        "Location", foreign_keys=[current_location_id])
    birth_location = relationship("Location", foreign_keys=[birth_location_id])
    job = relationship("Job")

    images = relationship("UserImages", back_populates="user")
