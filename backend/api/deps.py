from typing import Generator
from database import Session

def get_db() -> Generator:
    try:
        db = Session()
        yield db
    finally:
        db.close()
