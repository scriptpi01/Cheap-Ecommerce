// Settings.jsx
import React from 'react';
import '../styles/Settings.css';  // Ensure correct path

const Settings = () => {
    return (
        <div className="settings-container">
            <h1>Settings</h1>
            <form>
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
