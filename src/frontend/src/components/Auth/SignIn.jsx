import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from ".";

export default function SignIn() {
    const auth = useAuth();

    const onSignIn = event => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        auth.signIn(formData);
    };

    if (auth.user) {
        return <Navigate to="/" />
    }

    return (
        <form onSubmit={onSignIn}>
            <input name="username" type="text" placeholder="Username" />
            <input name="password" type="password" placeholder="Password" />

            <button type="submit">Sign In</button>
        </form>
    );
}