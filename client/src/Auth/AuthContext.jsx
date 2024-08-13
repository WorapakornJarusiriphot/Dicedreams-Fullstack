import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode without braces
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [userId, setUserId] = useState(localStorage.getItem('user_id'));
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [profilePic, setProfilePic] = useState(localStorage.getItem('profile_pic'));

    useEffect(() => {
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            const id = decodedToken.users_id;
            console.log("Decoded Token User ID:", id); // Log the decoded user ID
            setUserId(id);
            fetchUserDetails(id);
        }
    }, [accessToken]);

    const fetchUserDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Include the token in the request
                },
            });
            const { username, user_image } = response.data;
            console.log("Fetched User Details:", { username, user_image }); // Log fetched details
            setUsername(username);
            setProfilePic(user_image);
            localStorage.setItem('username', username);
            localStorage.setItem('profile_pic', user_image);
        } catch (error) {
            console.error('Failed to fetch user details', error);
        }
    };

    const login = (token) => {
        localStorage.setItem('access_token', token);
        const decodedToken = jwtDecode(token);
        const id = decodedToken.users_id;
        console.log("Login User ID:", id); // Log the user ID on login
        localStorage.setItem('user_id', id);
        setAccessToken(token);
        setUserId(id);
        fetchUserDetails(id);
    };

    const logout = () => {
        console.log("Logging out..."); // Log when logging out
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        localStorage.removeItem('profile_pic');
        setAccessToken(null);
        setUserId(null);
        setUsername(null);
        setProfilePic(null);
    };

    const setCredential = (token) => {
        login(token); // Reuse login logic
    };

    return (
        <AuthContext.Provider value={{ accessToken, userId, username, profilePic, login, logout, setCredential }}>
            {children}
        </AuthContext.Provider>
    );
};
