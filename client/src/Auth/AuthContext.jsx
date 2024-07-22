import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

    const login = (token) => {
        localStorage.setItem('access_token', token);
        setAccessToken(token);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        setAccessToken(null);
    };
    
    const setCredential = (access_token) => {
        setAccessToken(access_token);
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout, setCredential }}>
            {children}
        </AuthContext.Provider>
    );
};
