import { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/users`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setUsers(res.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching users');
            }
        };
        fetchUsers();
    }, []);

    const blockUser = async (telegramId) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/users/${telegramId}/block`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setUsers(users.map(u => u.telegramId === telegramId ? { ...u, isBlocked: true } : u));
        } catch (err) {
            setError(err.response?.data?.message || 'Error blocking user');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-3">
            <h1 className="text-3xl font-bold mb-4">Manage Users</h1>
            {error && <p className="text-red-500">{error}</p>}
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-slate-200">
                        <th className="p-2">Telegram ID</th>
                        <th className="p-2">City</th>
                        <th className="p-2">Subscribed</th>
                        <th className="p-2">Blocked</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.telegramId} className="border-b">
                            <td className="p-2">{user.telegramId}</td>
                            <td className="p-2">{user.city}</td>
                            <td className="p-2">{user.subscribed ? 'Yes' : 'No'}</td>
                            <td className="p-2">{user.isBlocked ? 'Yes' : 'No'}</td>
                            <td className="p-2">
                                <button
                                    className="bg-red-500 text-white p-1 rounded"
                                    onClick={() => blockUser(user.telegramId)}
                                >
                                    Block
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;