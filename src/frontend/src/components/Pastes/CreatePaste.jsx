import React from "react";
import axios from "axios";

import { useAuth } from "../Auth";
import config from "../../config";

/*
 id = Column(Integer, primary_key=True, index=True)
    title = Column(String(30))
    content = Column(String(500))
    language = Column(String(20))
    is_private = Column(Boolean, default=False)
    user_id = Column(Integer, ForeignKey("users.id"))

*/

export default function CreatePaste() {
    const auth = useAuth();

    const { access_token } = auth.user;

    const onCreatePastre = event => {
        event.preventDefault();
        
        const newPaste = new FormData(event.currentTarget);

        axios.post(`${config.apiUrl}/pastes/create`, newPaste, {
            headers: { 
                "Content-Type": "multipart/form-data",
               "Authorization": `Bearer ${access_token}`,
            },
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <h2>Create Paste</h2>
            <form onSubmit={onCreatePastre}>
                <input type="text" name="title" placeholder="Paste title" />
                <textarea name="content" cols="30" rows="10" defaultValue="Paste content" />
                <input type="text" name="language" placeholder="Paste language"  />
                <button type="submit">Create paste</button>
            </form>
        </div>
    );  
};