from datetime import timedelta
from fastapi import Depends, FastAPI, HTTPException, Security
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select
from models import UserModel
from schemas import Token, User, CreateUser
from auth import ACCESS_TOKEN_EXPIRE_MINUTES, create_user, authenticate_user, create_access_token, get_current_active_user, get_current_user

app = FastAPI()

fake_users_db = {}

@app.get("/")
async def root():
    users = select(UserModel).

    return { 
        "message": "Hello World",
        "users": users
    }

@app.post("/create", response_model=CreateUser)
async def create(form_data: CreateUser= Depends()):
    user = create_user(form_data.username, form_data.email, form_data.password)

    return { "user": user, "status": "ok" }

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
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

@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(current_user: User = Security(get_current_active_user, scopes=["items"])):
    return [{"item_id": "Foo", "owner": current_user.username}]


@app.get("/status/")
async def read_system_status(current_user: User = Depends(get_current_user)):
    return {"status": "ok"}