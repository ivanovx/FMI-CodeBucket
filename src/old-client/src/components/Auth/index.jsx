import React, { useState } from "react";
import axios from "axios";

import config from "../../config"

const AuthContext = React.createContext(null);

export const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const signUp = newUser => {
        console.log(newUser);
        //axios.post(, newUser).then(res => console.log(res));
        const url = `${config.apiUrl}/user/signup`;
        const headers = {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
        };

        axios.post(url, newUser, headers).then(res => console.log(res));
    };

    const signIn = newUser => {
        console.log(newUser);

        const url = `${config.apiUrl}/user/signin`;

        const params = new URLSearchParams();
        params.append('username', newUser.userame);
        params.append('password', newUser.password);

        axios.post(url, params).then(res => console.log(res)).catch(err => console.log(err))
    };

    const signOut = () => {

    };

    return (
        <AuthContext.Provider value={{user, signUp, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}