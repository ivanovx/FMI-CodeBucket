from typing import Union
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import  OAuth2PasswordRequestForm, OAuth2PasswordBearer, SecurityScopes
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import ValidationError
from api.deps import get_db

from sqlalchemy.orm import Session

from database import UserModel
from schemas import CreateUser, TokenData

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/user/signin")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_user(db: Session, form_data: CreateUser):
    user = UserModel()

    user.email = form_data.email
    user.username = form_data.username
    user.hashed_password = pwd_context.hash(form_data.password)

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def get_user(db: Session, username: str):
    user = db.query(UserModel).where(UserModel.username == username).first()

    return user

def authenticate_user(db: Session, form_data: OAuth2PasswordRequestForm):
    user = get_user(db, form_data.username)

    if not user:
        return False
    if not verify_password(form_data.password, user.hashed_password):
        return False
    
    return user

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt

async def get_current_user(security_scopes: SecurityScopes, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = f"Bearer"

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={
            "WWW-Authenticate": authenticate_value
        },
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")

        if username is None:
            raise credentials_exception

        token_scopes = payload.get("scopes", [])
        token_data = TokenData(scopes=token_scopes, username=username)
    except (JWTError, ValidationError):
        raise credentials_exception

    user = get_user(db, token_data.username)
    
    if user is None:
        raise credentials_exception
    
    for scope in security_scopes.scopes:
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    return user