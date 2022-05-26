import React from "react";
import axios from "axios";

const AuthContext = React.createContext(null);

export const useAuth = () => React.useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        console.log(user);
    }, [user]);

    const signUp = () => {

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