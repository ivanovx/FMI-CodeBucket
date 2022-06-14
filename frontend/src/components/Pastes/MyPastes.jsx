import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../Auth";
import config from "../../config"

export default function MyPastes() {
    const auth = useAuth();
    const [pastes, setPastes] = useState([]);

    const { access_token } = auth.user;

    useEffect(() => { 
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
        <ul>
            {pastes.map(paste => (
                <li key={paste.id}>
                    <Link to={`/pastes/${paste.id}`}>{paste.title}</Link>
                </li>
            ))}
        </ul>
    );
}