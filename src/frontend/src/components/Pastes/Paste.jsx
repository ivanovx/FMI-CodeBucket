import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import config from "../../config";

export default function Paste(){
    const { id } = useParams();

    const [paste, setPaste] = useState({});

    useEffect(() => {
        axios.get(`${config.apiUrl}/pastes/${id}`).then(res => setPaste(res.data));
    }, []);

    return (
        <div className="Paste">
            <h1>{paste.title}</h1>
            <p>{paste.language}</p>
            <code>{paste.content}</code>
        </div>
    )
}