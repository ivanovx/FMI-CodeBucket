import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Pastes from "./components/Pastes";
import MyPastes from "./components/Pastes/MyPastes";
import CreatePaste from "./components/Pastes/CreatePaste";
import Layout from "./components/Layout";

import Users from "./components/Users";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import AuthProvider from "./components/Auth";
import Paste from "./components/Pastes/Paste";

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/pastes" element={<Pastes />} />
                    <Route path="/pastes/:id" element={<Paste />} />
                    <Route path="/pastes/my" element={<MyPastes />} />
                    <Route path="/pastes/create" element={<CreatePaste />} />
                    <Route path="users" element={<Users />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}