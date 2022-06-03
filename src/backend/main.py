from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import api_router

from models import Base
from database import engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)