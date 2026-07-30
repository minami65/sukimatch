from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import engine, Base

from app.api import user, locations, gender, education, job, income, marriage, holiday, alcohol, smoking, living, meeting, auth, user_images, matches, likes, websocket

# モデルたち
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

from app.core.config import setup_cloudinary

app = FastAPI()

setup_cloudinary()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"https://sukimatch-sigma(-.*)?\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Hello FastAPI"}


# テーブルの自動作成
Base.metadata.create_all(bind=engine)

# ルーターの登録
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
app.include_router(matches.router)
app.include_router(likes.router)
app.include_router(user_images.router)
app.include_router(websocket.router)
