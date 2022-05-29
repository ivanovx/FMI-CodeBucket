import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../Auth";
import config from "../../config"


export default function MyPastes() {
    const auth = useAuth();
    const [pastes, setPastes] = useState([]);

    useEffect(() => {
        const { access_token } = auth.user;
        axios
            .get(`${config.apiUrl}/pastes/my`, {
                headers: { "Authorization": `Bearer ${access_token}`}
            })
            .then(res => {
                setPastes(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            {pastes.map(paste => (
                <div key={paste.title}>
                    <h1>{paste.title}</h1>
                    <h2>{paste.language}</h2>
                    <code>{paste.content}</code>
                </div>
            ))}
        </div>
    );
}