from sqlalchemy.orm import Session
from app.models.user import User
from app.models.matches import Matches

# マッチしたユーザー一覧
def get_my_matches(db: Session, user_id: int):
  matches_as_user1 = (
      db.query(Matches, User)
      .join(Matches, Matches.user2_id == User.user_id)
      .filter(Matches.user1_id == user_id)
      .all()
  )
  matches_as_user2 = (
      db.query(Matches, User)
      .join(Matches, Matches.user1_id == User.user_id)
      .filter(Matches.user2_id == user_id)
      .all()
  )

  all_matches = []
  for match, user in (matches_as_user1 + matches_as_user2):
      all_matches.append({
          "match_id": match.id,
          "is_chat_started": match.is_chat_started,
          "user": {
              "user_id": user.user_id,
              "name": user.name,
              "age": user.age,
          }
      })
    
  all_matches.sort(key=lambda x: x["match_id"], reverse=True)
  return all_matches