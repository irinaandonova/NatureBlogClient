import { createContext, useState } from "react";

const initialValue = { id: 2, username: 'string', email: 'string' };
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(initialValue);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
