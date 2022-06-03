from sqlalchemy.orm import Session

from models import User

def get_user(db: Session, username: str):
    user = db.query(User).filter(User.username == username).first()

    return user

def create_user(db: Session, user: User):
    db.add(user)
    db.commit()
    db.refresh(user)

    return user