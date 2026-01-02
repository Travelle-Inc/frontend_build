import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    // Initialize from localStorage or default to logged in state
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            return JSON.parse(savedUser);
        }
        // Default logged in user
        return {
            name: 'Ilya Belous',
            email: 'ilya@travelle.inc',
            username: '@ilyabelous',
            avatar: '/profile-ilya.jpg'
        };
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const savedAuth = localStorage.getItem('isAuthenticated');
        return savedAuth !== null ? JSON.parse(savedAuth) : true; // Default to logged in
    });

    // Save to localStorage whenever auth state changes
    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [isAuthenticated, user]);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        // Clear any other user-specific data from localStorage if needed
        localStorage.removeItem('user');
        localStorage.setItem('isAuthenticated', 'false');
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

