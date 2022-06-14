import React from "react";
import { Navigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

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
        <Form onSubmit={onSignIn}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Enter password" />
            </Form.Group>
            <Button variant="primary" type="submit">Sign In</Button>
        </Form>
    );
}