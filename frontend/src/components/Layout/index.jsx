import React, { useReducer } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Nav, Button, Container } from "react-bootstrap";

import { useAuth } from "../Auth";

export default function Layout() {
    const auth = useAuth();
    const navigate = useNavigate();

    const onSelectNav = selectedLink => navigate(selectedLink);

    const AuthLinks = () => {
        if (auth.user) {
            return (
                <>
                    <Nav.Item>
                        <Nav.Link eventKey="/pastes/my">My Pastes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/pastes/create">Create Paste</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        Welcome {auth.user.user.username}
                        <Button onClick={() => auth.signOut()}>Sign Out</Button>
                    </Nav.Item>
                </>
            );
        }

        return (
            <>
                <Nav.Item>
                    <Nav.Link eventKey="/signup">Sign Up</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/signin">Sign In</Nav.Link>
                </Nav.Item>
            </>
        );
    };

    return (
        <Container>
            <Nav onSelect={onSelectNav}>
                <Nav.Item>
                    <Nav.Link eventKey="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/pastes">Pastes</Nav.Link>
                </Nav.Item>
                <AuthLinks />
            </Nav>
            <Outlet />
        </Container>
    )
}