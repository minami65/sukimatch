from sqlalchemy.orm import Session
from app.crud.user import get_user
from app.crud.likes import get_like

def get_user_detail_with_like(db: Session, user_id: int, current_user_id: int):
    user = get_user(db, user_id)
    if not user:
        return None
    
    like = get_like(db, current_user_id, user_id)
    
    user_data = user.__dict__.copy()
    user_data["is_liked"] = like is not None
    return user_data