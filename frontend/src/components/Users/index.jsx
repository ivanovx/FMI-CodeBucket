import React, { useState, useEffect } from "react";
import axios from "axios";

import config from "../../config";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(`${config.apiUrl}/user`)
            .then(res => {
                console.log(res);

                setUsers(res.data);
            });
    }, []);

    return (
        <>
            <h1>Users</h1>
            <div>
                {users.map(user => (
                    <div key={user.id}>
                        {user.username}
                    </div>
                ))}
            </div>
        </>
    )
}