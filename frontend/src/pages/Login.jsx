import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function Login() {
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

  const handleLogin = async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4050/auth/login', data);
      if(response){
        localStorage.setItem('token', response.data.token);
        nav('/');
        setLoading(false);
      }
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div className='h-full flex flex-col justify-center items-center gap-10'>
      <h1 className='text-3xl font-bold mt-10'>Login</h1>
      <form className='bg-slate-100 p-3 rounded-lg flex flex-col gap-4 lg:w-1/3 sm:w-1/2 shadow-lg'>
        <input type="email" id='email' placeholder='Email' className='focus:outline-none p-3 rounded-lg' onChange={handleChange} />
        <input type="password" id='password' placeholder='Password' className='focus:outline-none p-3 rounded-lg' onChange={handleChange}/>
        <button type='button' className='bg-slate-700 p-3 rounded-lg text-white shadow-lg' onClick={handleLogin}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <OAuth setError={setError}/>
        {error && <p className='text-red-500'>{error}</p>}
      </form>
      <div>
        <p>Don't have an account? <span className='text-blue-700 hover:underline cursor-pointer' onClick={() => nav('/signUp')}>Sign up!</span></p>
      </div>
    </div>
  )
}

export default Login