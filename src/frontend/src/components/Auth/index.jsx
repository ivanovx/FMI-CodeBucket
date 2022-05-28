import React, { useState } from "react";
import axios from "axios";

import config from "../../config"

const AuthContext = React.createContext(null);

export const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const signUp = newUser => {
        /*console.log(newUser);

        const url = `${config.apiUrl}/user/signup`;
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        };

        axios.post(url, newUser, headers).then(res => console.log(res));*/
    };

    const signIn = newUser => {
        axios.post(`${config.apiUrl}/user/signin`, newUser, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    };

    const signOut = () => {

    };

    return (
        <AuthContext.Provider value={{user, signUp, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}