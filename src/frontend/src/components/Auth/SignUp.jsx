import React from "react";
import { Navigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { useAuth } from ".";

export default function SignUp() {
    const auth = useAuth();

    const onSignUp = event => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        auth.signUp(formData);
    };

    if (auth.user) {
        return <Navigate to="/" />
    }

    return (
        <Form onSubmit={onSignUp}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Enter password" />
            </Form.Group>
            <Button variant="primary" type="submit">Sign Up</Button>
        </Form>
    );
}