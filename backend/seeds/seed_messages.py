import random
from datetime import datetime, timedelta, timezone

from app.db import SessionLocal
from app.models.matches import Matches
from app.models.message import Message
from sqlalchemy.exc import SQLAlchemyError


def seed_messages():
    db = SessionLocal()
    try:
        # シード対象のマッチングを取得
        match = db.query(Matches).filter(Matches.id == 1).first()
        if not match:
            print(
                "❌ マッチング(ID: 1)が見つかりません。先にマッチデータを作成してください。"
            )
            return

        user1_id = match.user1_id
        user2_id = match.user2_id

        # 生成するメッセージの件数（ページネーション検証用に多めに設定）
        total_messages = 80

        # 5日前の日時をスタート地点にする
        current_time = datetime.now(timezone.utc) - timedelta(days=5)

        # ダミーの会話テキスト候補
        sample_texts = [
            "こんにちは！",
            "お疲れ様です！",
            "今日は暑いですね☀️",
            "それな！",
            "週末は何してましたか？",
            "映画見てました🎬",
            "おすすめのカフェありますか？",
            "仕事終わりました〜",
            "了解です！",
            "すごいですね！",
            "また連絡しますね",
            "おはようございます！",
            "おやすみなさい💤",
            "ほんとですか！？",
            "笑",
            "たしかに！",
            "今度行きましょう！",
            "いいですね✨",
            "よろしくお願いします！",
        ]

        messages_to_insert = []

        for i in range(total_messages):
            # 70%の確率で交互に、30%の確率で連続投稿になるように送信者をランダムに決定
            sender_id = user1_id if random.random() > 0.5 else user2_id

            # メッセージ内容（何件目か分かるように番号を振っておくと検証しやすい）
            text = f"[{i + 1}件目] {random.choice(sample_texts)}"

            # 1件ごとに 2分〜30分 の間でランダムに時間を進める
            current_time += timedelta(minutes=random.randint(2, 30))

            # 最新の3件だけ「未読」にするなどのテストも可能
            is_read = i < (total_messages - 3)

            messages_to_insert.append(
                Message(
                    match_id=match.id,
                    sender_id=sender_id,
                    content_type="text",
                    content=text,
                    is_read=is_read,
                    created_at=current_time,
                )
            )

        # bulk_save_objects を使うと100件でも一瞬でDBに保存できる
        db.bulk_save_objects(messages_to_insert)
        db.commit()

        print(
            f"✅ メッセージのシードデータの登録が完了しました！（計{total_messages}件）"
        )

    except SQLAlchemyError as e:
        db.rollback()
        print(f"❌ DBエラーが発生しました: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_messages()
