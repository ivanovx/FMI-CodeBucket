from fastapi import APIRouter

from .endpoints import user, users, pastes, comments

api_router = APIRouter()

api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(pastes.router, prefix="/pastes", tags=["pastes"])
api_router.include_router(comments.router, prefix="/comments", tags=["comments"])