import axios from "axios";
import { useEffect, useState } from "react"

import config from "../../config";

export default function Home() {
    const [pastes, setPastes] = useState(null);

    useEffect(() => {
        axios
            .get(`${config.apiUrl}/pastes`)
            .then(response  => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return <h1>Home</h1>
}