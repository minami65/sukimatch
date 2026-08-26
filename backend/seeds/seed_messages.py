from datetime import datetime, timedelta, timezone

from app.db import SessionLocal
from app.models.matches import Matches
from app.models.message import Message
from sqlalchemy.exc import SQLAlchemyError


def seed_messages():
    db = SessionLocal()
    try:
        # シード対象のマッチングを取得（例: ID 1 のマッチ）
        match = db.query(Matches).filter(Matches.id == 1).first()
        if not match:
            print(
                "❌ マッチング(ID: 1)が見つかりません。先にマッチデータを作成してください。"
            )
            return

        user1_id = match.user1_id
        user2_id = match.user2_id

        # 過去のダミーメッセージデータを作成
        now = datetime.now(timezone.utc)
        sample_messages = [
            (
                user1_id,
                "はじめまして！マッチありがとうございます！",
                now - timedelta(hours=2),
            ),
            (
                user2_id,
                "はじめまして！こちらこそよろしくお願いします！😊",
                now - timedelta(hours=1, minutes=55),
            ),
            (
                user1_id,
                "プロフィールのカフェの写真、すごく素敵ですね！どこですか？",
                now - timedelta(hours=1, minutes=40),
            ),
            (
                user2_id,
                "ありがとうございます！渋谷にある〇〇カフェです！ラテアートが有名なんですよ☕",
                now - timedelta(hours=1, minutes=30),
            ),
            (
                user1_id,
                "そうなんですね！今度行ってみたいです！",
                now - timedelta(minutes=20),
            ),
        ]

        # 登録処理
        for sender_id, text, created_at in sample_messages:
            msg = Message(
                match_id=match.id,
                sender_id=sender_id,
                content_type="text",
                content=text,
                is_read=True,
                created_at=created_at,
            )
            db.add(msg)

        db.commit()
        print("✅ メッセージのシードデータの登録が完了しました！")

    except SQLAlchemyError as e:
        db.rollback()
        print(f"❌ DBエラーが発生しました: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_messages()
