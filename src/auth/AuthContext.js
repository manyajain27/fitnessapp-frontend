// authcontext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api/api';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authTokens, setAuthTokens] = useState(() => 
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
);
    const [user, setUser] = useState(() => 
        localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
);

// AuthContext.jsx
const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/token/`, { email, password });
        console.log("Response data:", response.data);  // Check response data
        setAuthTokens(response.data);
        setUser({ email });

        localStorage.setItem('authTokens', JSON.stringify(response.data));
        localStorage.setItem('user', JSON.stringify({ email }));

        return { success: true };  // Indicate success
    } catch (error) {
        console.error('Login failed:', error);

        // Return a user-friendly error message
        if (error.response && error.response.data) {
            const errorMessages = Object.values(error.response.data).flat().join(", ");
            return { success: false, message: errorMessages || "Login failed." };
        }
        
        return { success: false, message: "An unexpected error occurred." };  // Default message
    }
};


    
    const refreshAuthToken = async () => {
        if (authTokens) {
            try {
                const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
                    refresh: authTokens.refresh,
                });
                setAuthTokens((prevTokens) => ({
                    ...prevTokens,
                    access: response.data.access,
                }));
                localStorage.setItem(
                    'authTokens',
                    JSON.stringify({ ...authTokens, access: response.data.access })
                );
            } catch (error) {
                console.error('Token refresh failed:', error);
                logoutUser();
            }
        }
    };
    
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('user');  
        navigate('/login');
    };

    const contextValue = {
        user,
        authTokens,
        loginUser,
        logoutUser,
        refreshAuthToken  
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
