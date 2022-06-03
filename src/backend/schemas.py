from typing import List
from fastapi import Form

class Token:
    token: str
    type: str

class TokenData:
    username: str
    scopes: List[str] = []

class UserSignUp:
    def __init__(
        self, 
        email: str = Form(), 
        username: str = Form(), 
        password: str = Form(),
    ):
        self.email = email
        self.username = username
        self.password = password

class UserSignIn:
    def __init__(
        self, 
        username: str = Form(), 
        password: str = Form(),
        scopes: str = Form(default=None),
    ):
        self.username = username
        self.password = password
        self.scopes = scopes