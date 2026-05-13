from sqlalchemy.orm import Session
from app.models.footprint import FootPrint
from app.models.user import User

def get_my_footprint(db:Session,user_id:int):
  footprint = (db.query(User)
            .join(FootPrint,FootPrint.visitor_user_id == User.user_id)
            .filter(FootPrint.visited_user_id == user_id)
            .all()
  )
  return footprint
