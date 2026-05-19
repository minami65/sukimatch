from fastapi import FastAPI
from app.api import user,locations,gender,education,job,income,marriage,holiday,alcohol,smoking,living,meeting,auth,user_images
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
from app.models.likes import Likes
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello FastAPI"}

Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(locations.router)
app.include_router(gender.router)
app.include_router(education.router)
app.include_router(job.router)
app.include_router(income.router)
app.include_router(marriage.router)
app.include_router(holiday.router)
app.include_router(alcohol.router)
app.include_router(smoking.router)
app.include_router(living.router)
app.include_router(meeting.router)
app.include_router(auth.router)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.include_router(user_images.router)
