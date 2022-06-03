from datetime import timedelta
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException

from api.deps import get_db
from crud.user import create_user
from models import User
from schemas import UserSignUp, UserSignIn

router = APIRouter()

from auth import ACCESS_TOKEN_EXPIRE_MINUTES, pwd_context, authenticate_user, create_access_token

@router.post("/signin")
def sign_in(db: Session = Depends(get_db), form_data: UserSignIn = Depends()):
    user = authenticate_user(db, form_data)

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data = {
            "sub": user.username, 
            "scopes": form_data.scopes
        },
        expires_delta=access_token_expires,
    )
    
    return {
        "email": user.email,
        "username": user.username,
        "token": access_token, 
        "type": "bearer"
    }


@router.post("/signup")
def sign_up(db: Session = Depends(get_db), form_data: UserSignUp = Depends()):
    user = User()

    user.email = form_data.email
    user.username = form_data.username
    user.hashed_password = pwd_context.hash(form_data.password)

    return create_user(db, user)