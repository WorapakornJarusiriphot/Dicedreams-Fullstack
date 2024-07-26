import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [userId, setUserId] = useState(localStorage.getItem('user_id'));

    useEffect(() => {
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUserId(decodedToken.users_id);
        }
    }, [accessToken]);

    const login = (token) => {
        localStorage.setItem('access_token', token);
        const decodedToken = jwtDecode(token);
        const id = decodedToken.users_id;
        localStorage.setItem('user_id', id);
        setAccessToken(token);
        setUserId(id);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        setAccessToken(null);
        setUserId(null);
    };

    const setCredential = (token) => {
        localStorage.setItem('access_token', token);
        const decodedToken = jwtDecode(token);
        const id = decodedToken.users_id;
        localStorage.setItem('user_id', id);
        setAccessToken(token);
        setUserId(id);
    };

    return (
        <AuthContext.Provider value={{ accessToken, userId, login, logout, setCredential }}>
            {children}
        </AuthContext.Provider>
    );
};
