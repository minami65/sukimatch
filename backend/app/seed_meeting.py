from app.db import SessionLocal
from app.models.meeting_preference import Meeting

def seed_meeting():
    db = SessionLocal()

    meeting = ["マッチング後、まずは会いたい","気が合えば会いたい","メッセージを重ねてから会いたい"]
    
    if db.query(Meeting).first():
        db.close()
        return

    for name in meeting:
        db.add(Meeting(meeting_preference_name=name))

        db.commit()
        db.close()

if __name__ == "__main__":
        seed_meeting()
