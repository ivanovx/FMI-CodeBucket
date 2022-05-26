import React from "react";

import AuthProvider, { useAuth } from "./components/Auth";

export default function App() {
    const auth = useAuth();
    
    return (
        <AuthProvider>
            <h1>Hello</h1>
        </AuthProvider>
    )
}