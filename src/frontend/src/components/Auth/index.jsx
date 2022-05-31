import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import store from "../../store";
import config from "../../config";

const AuthContext = React.createContext();

export const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({ children }) {
    const activeUser = store.get("user", null);
    const [user, setUser] = useState(activeUser);

    const navigate = useNavigate();

    useEffect(() => store.set("user", user), [user]);

    const signUp = newUser => {
        axios.post(`${config.apiUrl}/user/signup`, newUser, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            console.log(res);
            navigate("/signin");
        }).catch(err => {
            console.log(err);
        });
    };

    const signIn = newUser => {
        axios.post(`${config.apiUrl}/user/signin`, newUser, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            setUser(res.data);
            navigate("/");
        }).catch(err => {
            console.log(err);
        });
    };

    const signOut = () => setUser(null);

    return <AuthContext.Provider value={{user, signUp, signIn, signOut}}>{children}</AuthContext.Provider>
}