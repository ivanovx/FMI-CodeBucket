import React, { useState } from "react";
import axios from "axios";

import config from "../../config"

const AuthContext = React.createContext(null);

export const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const signUp = newUser => {
        axios
            .post(`${config.apiUrl}/create`, newUser)
            .then(response  => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const signIn = () => {

    };

    const signOut = () => {

    };

    return (
        <AuthContext.Provider value={{user, signUp, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}