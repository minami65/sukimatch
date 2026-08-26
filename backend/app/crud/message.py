from app.models.matches import Matches
from app.models.message import Message
from app.models.user import User
from app.schemas.message import MessageCreate, TalkListItem
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload


class CRUDMessage:
    def get_by_match_id(
        self, db: Session, match_id: int, limit: int = 30
    ) -> list[Message]:
        """特定の マッチングID のメッセージ一覧（最新のN件を過去から順に並べて）取得"""
        messages = (
            db.query(Message)
            .filter(Message.match_id == match_id)
            .order_by(Message.created_at.desc())  # 最新順に取得
            .limit(limit)
            .all()
        )
        return list(reversed(messages))  # チャットUI用に古→新に並び替え

    def create(
        self, db: Session, obj_in: MessageCreate, match_id: int, sender_id: int
    ) -> Message:
        """メッセージを新規作成"""
        db_obj = Message(
            match_id=match_id,
            sender_id=sender_id,
            content_type=obj_in.content_type,
            content=obj_in.content,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def check_user_in_match(self, db: Session, match_id: int, user_id: int) -> bool:
        """指定したユーザーがマッチングの当事者か確認"""
        match = db.query(Matches).filter(Matches.id == match_id).first()
        if not match:
            return False
        return match.user1_id == user_id or match.user2_id == user_id

    def get_talk_list(self, db: Session, user_id: int) -> list[TalkListItem]:
        """自分のマッチング一覧と、それぞれの最新メッセージ・相手のプロフィールを取得"""
        # 自分のマッチ一覧を取得
        matches = (
            db.query(Matches)
            .filter(or_(Matches.user1_id == user_id, Matches.user2_id == user_id))
            .all()
        )

        talk_list = []
        for match in matches:
            # 相手のユーザーIDを判定
            partner_id = match.user2_id if match.user1_id == user_id else match.user1_id
            partner = (
                db.query(User)
                .options(joinedload(User.images))
                .filter(User.user_id == partner_id)
                .first()
            )

            if not partner:
                continue

            # アイコン画像の取得（sort_order が最も小さい画像、なければ None）
            partner_icon_url = None
            if partner.images:
                sorted_images = sorted(partner.images, key=lambda x: x.sort_order)
                if sorted_images:
                    partner_icon_url = sorted_images[0].image_url

            # このマッチの最新メッセージを取得
            latest_msg = (
                db.query(Message)
                .filter(Message.match_id == match.id)
                .order_by(Message.created_at.desc())
                .first()
            )

            # 相手から送られてきた未読メッセージの件数をカウント（追加）
            unread_count = (
                db.query(Message)
                .filter(
                    Message.match_id == match.id,
                    Message.sender_id
                    != user_id,  # 自分以外の送信（＝相手からのメッセージ）
                    Message.is_read == False,  # 未読のもの
                )
                .count()
            )

            talk_list.append(
                TalkListItem(
                    match_id=match.id,
                    partner_id=partner.user_id,
                    partner_name=partner.name,
                    partner_icon_url=partner_icon_url,
                    latest_message=latest_msg.content
                    if latest_msg
                    else "マッチングしました！メッセージを送りましょう",
                    latest_message_at=latest_msg.created_at
                    if latest_msg
                    else match.created_at,
                    unread_count=unread_count,  # 追加！
                )
            )

        # 最新メッセージ（またはマッチ日時）が新しい順にソート
        talk_list.sort(key=lambda x: x.latest_message_at, reverse=True)
        return talk_list

    @staticmethod
    def mark_as_read(db: Session, match_id: int, current_user_id: int) -> int:
        """
        指定した match_id 内の、相手から届いた未読メッセージをすべて既読(is_read=True)にする
        """
        updated_count = (
            db.query(Message)
            .filter(
                Message.match_id == match_id,
                Message.sender_id
                != current_user_id,  # 自分が送ったやつではなく相手のメッセージ
                Message.is_read == False,  # 未読のものだけ
            )
            .update({"is_read": True}, synchronize_session=False)
        )
        db.commit()
        return updated_count


crud_message = CRUDMessage()
