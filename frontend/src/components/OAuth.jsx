import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OAuth({ setError }) {
    const nav = useNavigate();
    return (
        <GoogleLogin
            onSuccess={async (credentialResponse) => {
                try {
                    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/google`, {
                        credential: credentialResponse.credential,
                    });
                    localStorage.setItem('token', res.data.token);
                    nav('/users');
                } catch (error) {
                    setError(error.response?.data?.message || 'Google login failed');
                }
            }}
            onError={() => setError('Google login failed')}
        />
    );
}

export default OAuth;