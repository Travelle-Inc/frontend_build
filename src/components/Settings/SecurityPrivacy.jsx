import React from 'react';
import { ShieldCheck, Smartphone, History, Cookie } from 'lucide-react';

const SecurityPrivacy = () => {
    return (
        <div className="settings-content-inner">
            <h2 className="settings-page-title">Security & Privacy</h2>

            <div className="toggle-group">
                <div className="toggle-info">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account.</p>
                </div>
                <div className="toggle-switch active"></div>
            </div>

            <div className="section-divider"></div>

            <h3>Active Sessions</h3>
            <div className="session-list">
                <div className="session-item">
                    <Smartphone size={24} />
                    <div className="session-details">
                        <h4>iPhone 13 Pro</h4>
                        <p>San Francisco, CA • Just now</p>
                    </div>
                    <span className="current-badge">Current Device</span>
                </div>
                <div className="session-item">
                    <Smartphone size={24} />
                    <div className="session-details">
                        <h4>MacBook Pro</h4>
                        <p>San Francisco, CA • 2 hours ago</p>
                    </div>
                    <button className="btn-text-danger">Revoke</button>
                </div>
            </div>

            <div className="section-divider"></div>

            <h3>Privacy</h3>
            <div className="toggle-group">
                <div className="toggle-info">
                    <h3>Profile Visibility</h3>
                    <p>Allow others to find your profile by email.</p>
                </div>
                <div className="toggle-switch active"></div>
            </div>

            <div className="toggle-group">
                <div className="toggle-info">
                    <h3>Data Sharing</h3>
                    <p>Share usage data to help us improve Travelle.</p>
                </div>
                <div className="toggle-switch"></div>
            </div>

        </div>
    );
};

export default SecurityPrivacy;
