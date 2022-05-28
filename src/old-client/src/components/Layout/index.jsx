import React, { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Nav, Container } from "react-bootstrap";

import AuthProvider from "../Auth";

export default function Layout() {
    const navigate = useNavigate();

    const onSelectNav = useCallback(selectedLink => navigate(selectedLink));

    return (
        <AuthProvider>
            <Container>
                <Nav onSelect={onSelectNav}>
                    <Nav.Item>
                        <Nav.Link eventKey="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/pastes">Pastes</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/signup">Sign Up</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="/signin">Sign In</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Outlet />
            </Container>
        </AuthProvider>
    )
}