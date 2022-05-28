import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Layout from "./components/Layout";

import Users from "./components/Users";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";

export default function App() {    
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="users" element={<Users />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Route>
        </Routes>
    )
}