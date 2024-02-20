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

    const handleRegister = async (username, email, password) => {
        try {
            const response = await fetch('https://taskify-8h37.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                alert('Registration successful! Please sign in.'); // Print message to the user
                console.log('Registration successful! User data:', userData); // Log to the console
                navigate('/signin'); // Redirect to SignIn after successful sign up
            } else {
                console.error('Sign up failed:', response.statusText);
            }
        } catch (error) {
            console.error('Sign up failed:', error);
        }
    };

    const handleSignOut = async () => {
        try {
            const response = await fetch('https://taskify-8h37.onrender.com/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setUser(null);
                navigate('/signin'); // Redirect to sign-in page after sign out
            } else {
                console.error('Sign out failed:', response.statusText);
            }
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

