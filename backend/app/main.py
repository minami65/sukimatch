from fastapi import FastAPI
from app.api import user,locations,education,job,income,marriage,holiday,alcohol,smoking,living,meeting
from app.db import engine, Base
from app.models.user import User
from app.models.locations import Location
from app.models.education import Education
from app.models.job import Job
from app.models.income import Income
from app.models.marriage import Marriage
from app.models.holiday import Holiday
from app.models.alcohol import Alcohol
from app.models.smoking import Smoking
from app.models.living_arrangement import Living
from app.models.meeting_preference import Meeting
from app.models.user_images import UserImages
from app.models.likes import Likes
from app.models.matches import Matches


app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello FastAPI"}

Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(locations.router)
app.include_router(education.router)
app.include_router(job.router)
app.include_router(income.router)
app.include_router(marriage.router)
app.include_router(holiday.router)
app.include_router(alcohol.router)
app.include_router(smoking.router)
app.include_router(living.router)
app.include_router(meeting.router)
