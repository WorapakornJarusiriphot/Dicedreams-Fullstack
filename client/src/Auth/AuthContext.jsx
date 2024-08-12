import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [userId, setUserId] = useState(localStorage.getItem('user_id'));
    const [username, setUsername] = useState('');
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUserId(decodedToken.users_id);
            fetchUserProfile(decodedToken.users_id);
        }
    }, [accessToken]);

    const fetchUserProfile = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const data = await response.json();
            setUsername(data.username);
            setProfilePic(data.user_image);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const login = (token) => {
        localStorage.setItem('access_token', token);
        const decodedToken = jwtDecode(token);
        const id = decodedToken.users_id;
        localStorage.setItem('user_id', id);
        setAccessToken(token);
        setUserId(id);
        fetchUserProfile(id);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        setAccessToken(null);
        setUserId(null);
        setUsername('');
        setProfilePic('');
    };

    return (
        <AuthContext.Provider value={{ accessToken, userId, username, profilePic, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
