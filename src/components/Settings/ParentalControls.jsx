import React from 'react';
import { Lock, Clock, AlertTriangle } from 'lucide-react';

const ParentalControls = () => {
    return (
        <div className="settings-content-inner">
            <h2 className="settings-page-title">Parental Controls</h2>

            <div className="alert-banner">
                <AlertTriangle size={18} />
                <p>These settings are protected by a PIN.</p>
            </div>

            <div className="toggle-group">
                <div className="toggle-info">
                    <h3>Enable Parental Controls</h3>
                    <p>Turn on restrictions for this account.</p>
                </div>
                <div className="toggle-switch"></div>
            </div>

            <div className="section-divider"></div>

            <div className="settings-card disabled">
                <div className="card-header">
                    <Lock size={20} />
                    <h3>Content Restrictions</h3>
                </div>
                <div className="card-content">
                    <div className="checkbox-group">
                        <label className="checkbox-item">
                            <input type="checkbox" disabled />
                            <span>Restrict 18+ Content</span>
                        </label>
                        <label className="checkbox-item">
                            <input type="checkbox" disabled />
                            <span>Restrict Community Chat</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="settings-card disabled">
                <div className="card-header">
                    <Clock size={20} />
                    <h3>Time Limits</h3>
                </div>
                <div className="card-content">
                    <p>Set daily time limits for app usage.</p>
                    <button className="btn-secondary" disabled>Set Time Limits</button>
                </div>
            </div>

        </div>
    );
};

export default ParentalControls;
