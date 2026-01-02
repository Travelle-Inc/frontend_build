import React, { useState, useEffect } from 'react';
import { X, User, Settings, Shield, Eye, Users } from 'lucide-react';
import './SettingsModal.css';

// Import requested settings components
import ProfileSettings from '../Settings/ProfileSettings';
import AccountSettings from '../Settings/AccountSettings';
import SecurityPrivacy from '../Settings/SecurityPrivacy';
import Accessibility from '../Settings/Accessibility';
import ParentalControls from '../Settings/ParentalControls';

const SettingsModal = ({ isOpen, onClose, initialTab = 'profile' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    // Update active tab when initialTab prop changes (e.g. opening via deep link)
    useEffect(() => {
        if (isOpen) {
            setActiveTab(initialTab);
        }
    }, [isOpen, initialTab]);

    if (!isOpen) return null;

    const navItems = [
        { id: 'profile', label: 'Profile Settings', icon: User },
        { id: 'account', label: 'Account Settings', icon: Settings },
        { id: 'security', label: 'Security & Privacy', icon: Shield },
        { id: 'accessibility', label: 'Accessibility', icon: Eye },
        { id: 'parental', label: 'Parental Controls', icon: Users }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile': return <ProfileSettings />;
            case 'account': return <AccountSettings />;
            case 'security': return <SecurityPrivacy />;
            case 'accessibility': return <Accessibility />;
            case 'parental': return <ParentalControls />;
            default: return <ProfileSettings />;
        }
    };

    return (
        <div className="settings-modal-overlay" onClick={onClose}>
            <div className="settings-modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Sidebar */}
                <div className="settings-modal-sidebar">
                    <div className="settings-sidebar-header">
                        <h2>Settings</h2>
                    </div>
                    <nav className="settings-nav">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.id}
                                    className={`settings-nav-item ${activeTab === item.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(item.id)}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="settings-modal-content">
                    <button className="settings-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>

                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
