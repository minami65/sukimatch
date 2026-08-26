from app.models.matches import Matches
from app.models.user import User
from sqlalchemy import or_
from sqlalchemy.orm import Session


def get_my_matches(db: Session, user_id: int):
    matches_as_user1 = (
        db.query(Matches, User)
        .join(User, Matches.user2_id == User.user_id)
        .filter(Matches.user1_id == user_id)
        .all()
    )
    matches_as_user2 = (
        db.query(Matches, User)
        .join(User, Matches.user1_id == User.user_id)
        .filter(Matches.user2_id == user_id)
        .all()
    )

    all_matches = []
    for match, user in matches_as_user1 + matches_as_user2:
        all_matches.append(
            {
                "match_id": match.id,
                "user1_checked_match": match.user1_checked_match,
                "user2_checked_match": match.user2_checked_match,
                "user": {
                    "user_id": user.user_id,
                    "name": user.name,
                    "age": user.age,
                },
            }
        )

    all_matches.sort(key=lambda x: x["match_id"], reverse=True)
    return all_matches


def get_unread_matches(db: Session, user_id: int):
    matches = (
        db.query(Matches)
        .filter(
            or_(
                (Matches.user1_id == user_id) & (Matches.user1_checked_match == False),
                (Matches.user2_id == user_id) & (Matches.user2_checked_match == False),
            )
        )
        .all()
    )

    print(f"\n[DEBUG 1] 条件にマッチした Matches レコード数: {len(matches)}")

    unread_matches = []

    for match in matches:
        is_user1 = match.user1_id == user_id
        opponent_id = match.user2_id if is_user1 else match.user1_id

        print(f"[DEBUG 2] match_id: {match.id} | 相手のID(opponent_id): {opponent_id}")

        # ★ Userモデルの主キーカラム名を確認 (User.id なのか User.user_id なのか)
        # もし User モデルの主キーが `id` の場合は `User.id == opponent_id` に変更する必要があります
        opp = db.query(User).filter(User.user_id == opponent_id).first()

        print(f"[DEBUG 3] 取得した相手のUserオブジェクト: {opp}")

        if not opp:
            print(
                f"[DEBUG 4] ⚠️ opponent_id: {opponent_id} の User が見つからなかったためスキップされました"
            )
            continue

        # メイン画像URLを取得
        main_image_url = ""
        if getattr(opp, "images", None):
            sorted_images = sorted(
                opp.images, key=lambda x: getattr(x, "sort_order", 0)
            )
            if sorted_images:
                main_image_url = sorted_images[0].image_url

        unread_matches.append(
            {
                "match_id": match.id,
                "user1_checked_match": match.user1_checked_match,
                "user2_checked_match": match.user2_checked_match,
                "user": {
                    "user_id": getattr(opp, "user_id", getattr(opp, "id", None)),
                    "name": opp.name,
                    "age": opp.age,
                    "image_url": main_image_url,
                },
            }
        )

    return unread_matches


# マッチを既読にする関数（一括更新）


def mark_matches_as_read(db: Session, user_id: int, match_ids: list[int]):
    if not match_ids:
        return

    # 自分が user1 の場合の確認フラグをTrueに
    db.query(Matches).filter(
        Matches.id.in_(match_ids), Matches.user1_id == user_id
    ).update({"user1_checked_match": True}, synchronize_session=False)

    # 自分が user2 の場合の確認フラグをTrueに
    db.query(Matches).filter(
        Matches.id.in_(match_ids), Matches.user2_id == user_id
    ).update({"user2_checked_match": True}, synchronize_session=False)

    db.commit()
