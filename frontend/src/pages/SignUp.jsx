import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const nav = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    })
  }

  const handleSingUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post('http://localhost:4050/auth/signup', data);
      nav('/login');
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  const handlePasswordValidation = (e) => {
    const password = e.target.value;
    if(password.length === 0) {
      setError(null);
      return;
    }
    
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!regex.test(password)) {
      setError('Password should be at least 6 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.');
    } else {
      setError(null);
    }
  }

  return (
    <div className='h-full flex flex-col justify-center items-center gap-10'>
      <h1 className='text-3xl font-bold mt-10'>Sign Up</h1>
      <form className='bg-slate-100 p-3 rounded-lg flex flex-col gap-4 lg:w-1/3 sm:w-1/2 shadow-lg'>
        <input type="text" id='username' placeholder='Username' className='focus:outline-none p-3 rounded-lg' onChange={handleChange} />
        <input type="email" id='email' placeholder='Email' className='focus:outline-none p-3 rounded-lg' onChange={handleChange} />
        <input type="password" id='password' placeholder='Password' className='focus:outline-none p-3 rounded-lg' onChange={(e) => {
            handleChange(e);
            handlePasswordValidation(e);
          }}  />
        <button type='button' className='bg-slate-700 p-3 rounded-lg text-white shadow-lg' onClick={handleSingUp}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <button type='button' className='bg-red-500 p-3 rounded-lg text-white shadow-lg'>Continue with Google</button>
        {error && <p className='text-red-500'>{error}</p>}
      </form>
      <div>
        <p>Already have an account? <span className='text-blue-700 hover:underline cursor-pointer' onClick={() => nav('/login')}>Login!</span></p>
      </div>
    </div>
  )
}

export default SignUp