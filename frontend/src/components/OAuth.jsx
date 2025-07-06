import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

function OAuth({ setError }) {
    const nav = useNavigate();
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            if (result) {
                localStorage.setItem('user', JSON.stringify(result.user));
                nav('/');
            }
            console.log(result);
        } catch (error) {
            setError(error.message);
            console.log(error);
        }
    }
    return (
        <>
            <button type='button' className='bg-red-500 p-3 rounded-lg text-white shadow-lg' onClick={handleGoogleLogin}>Continue with Google</button>
        </>
    )
}

export default OAuth