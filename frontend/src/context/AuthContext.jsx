import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("ACCESS_TOKEN");
        if (savedToken) setToken(savedToken)
    }, []);

    const login = (accessToken, refreshToken) => {
        localStorage.setItem("ACCESS_TOKEN", accessToken);
        localStorage.setItem("REFRESH_TOKEN", refreshToken);
        setToken(accessToken);
    }

    const logout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("REFRESH_TOKEN");
        setToken(null);
    }

    const isAuthenticated = !!token;

    return(
        <AuthContext.Provider value ={{token, login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}
