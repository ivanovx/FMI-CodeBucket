from typing import List, Union
from fastapi.param_functions import Form
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None
    scopes: List[str] = []

class User(BaseModel):
    email: str
    username: str

class CreateUser(BaseModel):
    email: str
    username: str
    password: str

class CreatePaste(BaseModel):
    title: str
    content: str
    language: str

class UserSignUp(BaseModel):
    username: str
    password: str