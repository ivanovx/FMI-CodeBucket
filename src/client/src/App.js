import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Layout from "./components/Layout";

import SignUp from "./components/Auth/SignUp";

export default function App() {    
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
            </Route>
        </Routes>
    )
}