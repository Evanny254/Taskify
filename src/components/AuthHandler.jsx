import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';

function AuthHandler({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('https://taskify-8h37.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                navigate('/home'); // Redirect to home after successful login
            } else {
                console.error('Sign in failed:', response.statusText);
            }
        } catch (error) {
            console.error('Sign in failed:', error);
        }
    };
