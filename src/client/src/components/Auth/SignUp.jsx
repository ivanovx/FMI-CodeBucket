import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from ".";

export default function SignUp() {
    const auth = useAuth();

    const onSignUp = event => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const newUser = {
            email: formData.get("email"),
            username: formData.get("username"),
            password: formData.get("password"),
        };

        auth.signUp(newUser);
    };

    return (
        <form onSubmit={onSignUp}>
            <input name="email" type="email" placeholder="Email" />
            <input name="username" type="text" placeholder="Username" />
            <input name="password" type="password" placeholder="Password" />

            <button type="submit">Sign Up</button>
        </form>
    );
}