import React, { useState, useEffect } from "react";
import axios from "axios";

import config from "../../config"

export default function Pastes() {
    const [pastes, setPastes] = useState([]);

    useEffect(() => {
        axios
            .get(`${config.apiUrl}/pastes`)
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