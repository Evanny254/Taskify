import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';

function AuthHandler({ user, setUser }) {
    const navigate = useNavigate();