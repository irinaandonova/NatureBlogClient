import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialValue = { id: '', username: '', email: '' };
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(initialValue);
    const navigate = useNavigate();

    const login = (userInfo) => {
        console.log('here');
        setUser(userInfo);
        navigate('/');
    }
    return (
        <AuthContext.Provider value={{ user, login }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
