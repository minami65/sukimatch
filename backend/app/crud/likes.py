from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.likes import Likes
from app.models.user import User
from app.models.matches import Matches

# いいね 
def create_like(db: Session, from_user_id: int, to_user_id: int):
    # 1. バリデーション（自分へのいいね禁止）
    if from_user_id == to_user_id:
        raise HTTPException(status_code=400, detail="cannot like yourself")

    # 2. 重複チェック
    existing_like = db.query(Likes).filter(
        Likes.from_user_id == from_user_id,
        Likes.to_user_id == to_user_id
    ).first()
    
    if existing_like:
        raise HTTPException(status_code=400, detail="already liked")

    # 3. いいね作成    
    like = Likes(
        from_user_id = from_user_id,
        to_user_id = to_user_id
    )
    db.add(like)
    db.flush()

    # 4. マッチング判定（相手からも自分にいいねが来ているか）
    is_match = False
    reverse_like = db.query(Likes).filter(
        Likes.from_user_id == to_user_id,
        Likes.to_user_id == from_user_id
    ).first()

    if reverse_like:
        match = Matches(
            user1_id = min(from_user_id, to_user_id),
            user2_id = max(from_user_id, to_user_id),
            is_chat_started = False
        )
        db.add(match)
        is_match = True

    db.commit()

    return {
        "like": like,
        "is_match": is_match
    }

# 自分がしたいいね
def get_my_likes(db:Session,user_id:int):
  users = (
      db.query(User)
      .join(Likes,Likes.to_user_id == User.user_id)
      .filter(Likes.from_user_id == user_id)
      .all()
  )
  return users

# 自分にきたいいね
def get_liked_by_users(db:Session,user_id:int):
  users = (
        db.query(User)
        .join(Likes,Likes.from_user_id == User.user_id)
        .filter(Likes.to_user_id == user_id)
        .all()
    )
  return users


# ある人物がある人物にいいねをしているか判定
def get_like(db: Session, from_user_id: int, to_user_id: int):
    return db.query(Likes).filter(
        Likes.from_user_id == from_user_id,
        Likes.to_user_id == to_user_id
    ).first()

# いいね取り消し
def delete_like(db:Session,from_user_id:int,to_user_id:int):
    likes = db.query(Likes).filter(
        Likes.from_user_id == from_user_id,
        Likes.to_user_id == to_user_id
    ).first()
    
    if not likes:
        raise HTTPException(status_code=404,detail="Like not found")

    user1, user2 = sorted([from_user_id, to_user_id])
    match = db.query(Matches).filter(
        Matches.user1_id == user1,
        Matches.user2_id == user2
    ).first()
    
    if match:
        db.delete(match)
    
    db.delete(likes)
    db.commit()
    
    return {"message":"Like deleted"}
