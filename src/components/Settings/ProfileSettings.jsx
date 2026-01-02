import React from 'react';
import { Camera } from 'lucide-react';

const ProfileSettings = () => {
    return (
        <div className="settings-content-inner">
            <h2 className="settings-page-title">Profile Settings</h2>

            <div className="profile-header-section">
                <div className="profile-avatar-large">
                    <img src="/profile-ilya.jpg" alt="Profile" />
                    <button className="change-avatar-btn">
                        <Camera size={16} />
                    </button>
                </div>
                <div className="profile-info-summary">
                    <h3>Ilya Belous</h3>
                    <p>@ilyabelous</p>
                </div>
            </div>

            <div className="form-group">
                <label>Display Name</label>
                <input type="text" defaultValue="Ilya Belous" className="settings-input" />
            </div>

            <div className="form-group">
                <label>Username</label>
                <input type="text" defaultValue="ilyabelous" className="settings-input" />
                <p className="helper-text">www.travelle.com/@ilyabelous</p>
            </div>

            <div className="form-group">
                <label>Bio</label>
                <textarea className="settings-textarea" defaultValue="Travel enthusiast exploring the world one city at a time. 🌍✈️" rows={4} />
            </div>

            <div className="form-actions">
                <button className="btn-primary">Save Changes</button>
            </div>
        </div>
    );
};

export default ProfileSettings;
