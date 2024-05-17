import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';  // Ensure correct path
import { reload } from 'firebase/auth';

const Settings = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add your save logic here

        // Show an alert message
        alert('Settings saved successfully!');

        // Reload the page and stay on the same path
        navigate(0);
        window.location.reload();
    };

    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Notification Settings</label>
                    <select>
                        <option value="enabled">Enabled</option>
                        <option value="disabled">Disabled</option>
                    </select>
                </div>
                <div>
                    <label>Privacy Settings</label>
                    <select>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Settings;
