from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import (
    auth,
    job,
    likes,
    locations,
    matches,
    message,
    user,
    user_images,
    websocket,
)
from app.core.config import setup_cloudinary
from app.db import Base, engine
from app.models.job import Job
from app.models.likes import Likes
from app.models.locations import Location
from app.models.matches import Matches

# モデルたち
from app.models.user import User
from app.models.user_images import UserImages

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
app.include_router(job.router)
app.include_router(auth.router)
app.include_router(matches.router)
app.include_router(likes.router)
app.include_router(user_images.router)
app.include_router(message.router)
app.include_router(websocket.router)
