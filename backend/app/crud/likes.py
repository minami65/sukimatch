from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.likes import Likes
from app.models.user import User

# いいね 
def create_like(db:Session,from_user_id:int,to_user_id:int):

  if from_user_id == to_user_id:
        raise HTTPException(status_code=400,detail="cannot like yourself")
    
  #重複チェック
  existing_like = db.query(Likes).filter(
        Likes.from_user_id == from_user_id,
        Likes.to_user_id == to_user_id
    ).first()

  if existing_like:
        raise HTTPException(
            status_code=400,
            detail = "already liked"
        )
    
  like = Likes(
        from_user_id = from_user_id,
        to_user_id = to_user_id
    )

  db.add(like)
  db.commit()
  db.refresh(like)

  return  like

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

# いいね取り消し
def delete_like(db:Session,from_user_id:int,to_user_id:int):
    likes = db.query(Likes).filter(
        Likes.from_user_id == from_user_id,
        Likes.to_user_id == to_user_id
    ).first()
    
    if not likes:
        raise HTTPException(status_code=404,detail="Like not found")
    
    db.delete(likes)
    db.commit()
    return {"message":"Like deleted"}
