import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem('token'));
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Weather</span>
                        <span className='text-slate-700'>Bot</span>
                    </h1>
                </Link>
                <ul className='flex gap-4'>
                    {token ? (
                        <>
                            <Link to='/users'><li className='text-slate-700 hover:underline'>Users</li></Link>
                            <Link to='/settings'><li className='text-slate-700 hover:underline'>Settings</li></Link>
                            <Link to='/login' onClick={() => { localStorage.removeItem('token'); setToken(null); }}>
                                <li className='text-slate-700 hover:underline'>Logout</li>
                            </Link>
                        </>
                    ) : (
                        <Link to='/login'><li className='text-slate-700 hover:underline'>Login</li></Link>
                    )}
                </ul>
            </div>
        </header>
    );
}