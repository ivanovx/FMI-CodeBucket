from typing import List, Union
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None
    scopes: List[str] = []

class User(BaseModel):
    email: Union[str, None] = None
    username: Union[str, None] = None

class CreateUser(User):
    password: str = None

class CreatePaste(BaseModel):
    title: str
    content: str
    language: str