from ast import For
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
    email: str = Form()
    username: str = Form()
    password: str = Form()

class CreatePaste:
    def __init__(
        self, 
        title: str = Form(), 
        content: str = Form(), 
        language: str = Form()
    ):
        self.title = title
        self.content = content
        self.language = language