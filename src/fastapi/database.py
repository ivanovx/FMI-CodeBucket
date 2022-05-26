from sqlalchemy import create_engine, Boolean, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "mysql://root:root@localhost/codebin"

engine = create_engine(DATABASE_URL, echo=True)
Session = sessionmaker(bind=engine)
Base = declarative_base()

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(15), unique=True, index=True)
    email = Column(String(30), unique=True, index=True)
    hashed_password = Column(String(30))
    is_active = Column(Boolean, default=True)

class PasteModel(Base):
    __tablename__ = "pastes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(30))
    content = Column(String(500))
    language = Column(String(20))
    is_private = Column(Boolean, default=False)
    user_id = Column(Integer)

Base.metadata.create_all(engine)