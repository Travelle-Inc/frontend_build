import React from 'react';
import { Type, Monitor, Volume2 } from 'lucide-react';

const Accessibility = () => {
    return (
        <div className="settings-content-inner">
            <h2 className="settings-page-title">Accessibility</h2>

            <div className="settings-card">
                <div className="card-header">
                    <Type size={20} />
                    <h3>Text Size</h3>
                </div>
                <div className="card-content">
                    <p>Adjust the text size for better readability.</p>
                    <input type="range" min="12" max="24" defaultValue="16" className="range-slider" />
                    <div className="range-labels">
                        <span>Aa</span>
                        <span>Aa</span>
                        <span>Aa</span>
                    </div>
                </div>
            </div>

            <div className="toggle-group">
                <div className="toggle-info">
                    <h3>Reduced Motion</h3>
                    <p>Minimize animations throughout the application.</p>
                </div>
                <div className="toggle-switch"></div>
            </div>

            <div className="toggle-group">
                <div className="toggle-info">
                    <h3>High Contrast Mode</h3>
                    <p>Increase contrast for better visibility.</p>
                </div>
                <div className="toggle-switch"></div>
            </div>

            <div className="toggle-group">
                <div className="toggle-info">
                    <h3>Screen Reader Support</h3>
                    <p>Optimize interface for screen readers.</p>
                </div>
                <div className="toggle-switch active"></div>
            </div>
        </div>
    );
};

export default Accessibility;
