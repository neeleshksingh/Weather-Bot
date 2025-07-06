import { useState } from 'react';
import axios from 'axios';

function Settings() {
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/settings`, { weatherApiKey: apiKey }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            alert('Settings updated');
        } catch (err) {
            setError(err.response?.data?.message || 'Error updating settings');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-3">
            <h1 className="text-3xl font-bold mb-4">Bot Settings</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Weather API Key"
                    className="p-3 rounded-lg"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg">Save</button>
            </form>
        </div>
    );
}

export default Settings;