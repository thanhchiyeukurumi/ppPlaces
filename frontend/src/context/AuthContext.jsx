import { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token); // Decode token
                setUser({ token, userId: decoded.userId }); // Set user from token
            } catch (error) {
                console.error("Invalid token", error);
                setUser(null);
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem("token", userData.token);
        setUser({ token: userData.token, userId: jwtDecode(userData.token).userId });
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
