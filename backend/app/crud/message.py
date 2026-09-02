from app.models.matches import Matches
from app.models.message import Message
from app.models.user import User
from app.schemas.message import MessageCreate, TalkListItem
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload


class CRUDMessage:
    def get_by_match_id(
        self,
        db: Session,
        match_id: int,
        limit: int = 30,
        before_id: int | None = None,
    ) -> list[Message]:
        """特定の マッチングID のメッセージ一覧（最新のN件を過去から順に並べて）取得"""
        query = db.query(Message).filter(Message.match_id == match_id)

        # ユーザーが上にスクロールした時だけ、この条件が発動する
        if before_id:
            query = query.filter(Message.id < before_id)

        messages = (
            query.order_by(Message.id.desc())  # created_at.desc() でもOK
            .limit(limit)
            .all()
        )
        return messages

    def get_partner_id(self, db: Session, match_id: int, user_id: int) -> int | None:
        """指定したユーザーがマッチングの当事者か確認し、相手のユーザーIDを返す"""
        match = db.query(Matches).filter(Matches.id == match_id).first()

        # マッチが存在しない、または自分が当事者でない場合は None
        if not match or (match.user1_id != user_id and match.user2_id != user_id):
            return None

        # 相手のIDを返す
        return match.user2_id if match.user1_id == user_id else match.user1_id

    def get_room_meta(self, db: Session, match_id: int, user_id: int) -> dict | None:
        """マッチングの正当性を確認しつつ、相手のプロフィール情報を返す"""
        match = db.query(Matches).filter(Matches.id == match_id).first()
        if not match:
            return None

        # 自分がこのマッチングの当事者かチェック
        if match.user1_id != user_id and match.user2_id != user_id:
            return None

        # 相手のIDを特定
        partner_id = match.user2_id if match.user1_id == user_id else match.user1_id

        # 相手の情報を取得（アイコン画像も一緒に読み込む）
        partner = (
            db.query(User)
            .options(joinedload(User.images))
            .filter(User.user_id == partner_id)
            .first()
        )

        if not partner:
            return None

        # アイコン画像の取得
        partner_icon_url = None
        if partner.images:
            sorted_images = sorted(partner.images, key=lambda x: x.sort_order)
            if sorted_images:
                partner_icon_url = sorted_images[0].image_url

        return {
            "user_id": partner.user_id,
            "name": partner.name,
            "avatar_url": partner_icon_url,
        }

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
