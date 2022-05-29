from ast import Param
from fastapi import APIRouter, Depends, HTTPException, Form

from sqlalchemy.orm import Session
from schemas import CreatePaste

from database import UserModel, PasteModel

from auth import get_current_user

from api.deps import get_db

router = APIRouter()

@router.get("/")
def all_pastes(db: Session = Depends(get_db)):
    pastes = db.query(PasteModel).all()

    return pastes

@router.get("/my")
def my_pastes(db: Session = Depends(get_db), user: UserModel = Depends(get_current_user)):
    pastes = db.query(PasteModel).where(PasteModel.user_id == user.id).all()

    return pastes
    
@router.post("/create")
def create_paste(db: Session = Depends(get_db), form_data: CreatePaste = Depends(), user: UserModel = Depends(get_current_user)):
    paste = PasteModel()

    paste.title = form_data.title
    paste.content = form_data.content
    paste.language = form_data.language
    paste.is_private = False
    paste.user_id = user.id

    db.add(paste)
    db.commit()
    db.refresh(paste)

    return paste

@router.post("/update")
def update_paste(db: Session = Depends(get_db)):
    pass

@router.post("/delete")
def delete_paste():
    pass