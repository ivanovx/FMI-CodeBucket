from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from database import UserModel

from auth import ACCESS_TOKEN_EXPIRE_MINUTES, create_user, authenticate_user, create_access_token

from api.deps import get_db

from schemas import CreateUser

router = APIRouter()

@router.get("/")
def list_users(db: Session = Depends(get_db)):
    users = db.query(UserModel).all()

    return users

@router.post("/signup")
def signup(db: Session = Depends(get_db), form_data: CreateUser = Depends()):
    user = create_user(db, form_data)

    return user

@router.post("/signin")
def signin(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(db, form_data)

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "scopes": form_data.scopes},
        expires_delta=access_token_expires,
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer"
    }