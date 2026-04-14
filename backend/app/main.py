from fastapi import FastAPI
from app.api import user
from app.db import engine, Base
from app.models import user as user_model  

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello FastAPI"}

Base.metadata.create_all(bind=engine)

app.include_router(user.router)
