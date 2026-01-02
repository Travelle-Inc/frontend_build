import React from 'react';
import { Mail, Shield, Smartphone } from 'lucide-react';

const AccountSettings = () => {
    return (
        <div className="settings-content-inner">
            <h2 className="settings-page-title">Account Settings</h2>

            <div className="settings-card">
                <div className="card-header">
                    <Mail size={20} />
                    <h3>Email Address</h3>
                </div>
                <div className="card-content">
                    <p>Your email address is <strong>ilya@travelle.inc</strong></p>
                    <button className="btn-secondary">Change Email</button>
                </div>
            </div>

            <div className="settings-card">
                <div className="card-header">
                    <Shield size={20} />
                    <h3>Password</h3>
                </div>
                <div className="card-content">
                    <p>Last changed 3 months ago</p>
                    <button className="btn-secondary">Change Password</button>
                </div>
            </div>

            <div className="settings-card">
                <div className="card-header">
                    <Smartphone size={20} />
                    <h3>Phone Number</h3>
                </div>
                <div className="card-content">
                    <p>+1 (555) 123-4567</p>
                    <button className="btn-secondary">Update Phone Number</button>
                </div>
            </div>

            <div className="danger-zone">
                <h3>Delete Account</h3>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button className="btn-danger">Delete Account</button>
            </div>
        </div>
    );
};

export default AccountSettings;
