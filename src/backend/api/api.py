from fastapi import APIRouter

from api.endpoints import user, pastes

api_router = APIRouter()

api_router.include_router(user.router, prefix="/user", tags=["user"])
api_router.include_router(pastes.router, prefix="/pastes", tags=["pastes"])