from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import api 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
	allow_headers=["*"]
)

app.include_router(api.api_router)

"""
@app.get("/pastes")
async def list_pastes():
    pastes = session.query(PasteModel).all()

    return pastes

@app.post("/pastes/create")
async def create_paste(form_data: CreatePaste= Depends(), current_user = Depends(get_current_active_user)):
    paste = PasteModel()

    paste.title = form_data.title
    paste.content = form_data.content
    paste.language = form_data.language
    paste.is_private = False
    #paste.user_id = current_user.id

    session.add(paste)
    session.commit()

    return paste

@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(current_user: User = Security(get_current_active_user, scopes=["items"])):
    return [{"item_id": "Foo", "owner": current_user.username}]
"""