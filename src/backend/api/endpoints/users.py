from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.deps import get_db
from models import User

router = APIRouter()

@router.get("/")
def all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()

    return users
    