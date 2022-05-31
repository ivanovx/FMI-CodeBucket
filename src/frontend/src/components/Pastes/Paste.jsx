import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from "../../config";

export default function Paste(){
    const { id } = useParams();

    const [paste, setPaste] = useState(null);

    useEffect(() => {
        fetch(`${config.apiUrl}/pastes/${id}`)
            .then(res => res.json())
                .then(p => setPaste(p));
    }, [paste]);

    return (
        <div className="Paste">
            {paste && (
                <>
                    <h1>{paste.title}</h1>
                    <p>{paste.language}</p>
                    <code>{paste.content}</code>
                </>
            )}
        </div>
    )
}