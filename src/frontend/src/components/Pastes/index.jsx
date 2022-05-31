import React, { useState, useEffect } from "react";
import axios from "axios";

import config from "../../config"
import { Link } from "react-router-dom";

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
        <ul>
            {pastes.map(paste => (
                <li key={paste.id}>
                    <Link to={`/pastes/${paste.id}`}>{paste.title}</Link>
                </li>
            ))}
        </ul>
    );
}