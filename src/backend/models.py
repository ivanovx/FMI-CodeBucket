from datetime import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Text, DateTime

from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(25), unique=True, index=True)
    username = Column(String(10), unique=True, index=True)
    hashed_password = Column(String(100))
    is_active = Column(Boolean, default=True)
    created_on = Column(DateTime, default=datetime.utcnow)
    updated_on = Column(DateTime, default=datetime.utcnow)

    pastes = relationship("Paste", back_populates="user")
    comments = relationship("Comment", back_populates="user")

class Paste(Base):
    __tablename__ = "pastes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(250))
    content = Column(Text)
    is_private = Column(Boolean, default=False)
    created_on = Column(DateTime, default=datetime.utcnow)
    updated_on = Column(DateTime, default=datetime.utcnow)

    language_id = Column(ForeignKey("languages.id"))
    language = relationship("Language")

    user_id = Column(ForeignKey("users.id"))
    user = relationship("User", back_populates="pastes")

    comments = relationship("Comment", back_populates="paste")

class Language(Base):
    __tablename__ = "languages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(10), unique=True, index=True)
    ext = Column(String(10))

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)

    user_id = Column(ForeignKey("users.id"))
    user = relationship("User", back_populates="comments")

    paste_id = Column(ForeignKey("pastes.id"))
    paste = relationship("Paste", back_populates="comments")