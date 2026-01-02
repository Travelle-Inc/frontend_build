import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Shield, Eye, Users, ChevronRight, LogOut, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './SettingsPanel.css';

const SettingsPanel = ({ isOpen, onClose, onNavigate }) => {
    const { logout } = useAuth();
    const panelRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleLinkClick = (linkName) => {
        // Map friendly names to internal IDs for the modal
        const idMap = {
            'Profile Settings': 'profile',
            'Account Settings': 'account',
            'Security & Privacy': 'security',
            'Accessibility': 'accessibility',
            'Parental Controls': 'parental',
        };

        const tabId = idMap[linkName];
        if (tabId && onNavigate) {
            onNavigate(tabId);
        } else if (linkName === 'Log Out') {
            logout();
        }

        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={panelRef}
                    className="settings-panel"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    {/* Profile & Account Section */}
                    <div className="settings-section">
                        <div className="settings-item" onClick={() => handleLinkClick('Profile Settings')}>
                            <User size={18} />
                            <span>Profile Settings</span>
                        </div>
                        <div className="settings-item" onClick={() => handleLinkClick('Account Settings')}>
                            <Settings size={18} />
                            <span>Account Settings</span>
                        </div>
                    </div>

                    <div className="divider" />

                    {/* Security & Compliance Section (Matches provided image structure) */}
                    <div className="settings-section">
                        <div className="section-header">
                            Security & Compliance
                        </div>
                        <div className="settings-item" onClick={() => handleLinkClick('Security & Privacy')}>
                            <Shield size={18} />
                            <span>Security & Privacy</span>
                        </div>
                        <div className="settings-item" onClick={() => handleLinkClick('Accessibility')}>
                            <Eye size={18} />
                            <span>Accessibility</span>
                        </div>
                        <div className="settings-item" onClick={() => handleLinkClick('Parental Controls')}>
                            <Users size={18} />
                            <span>Parental Controls</span>
                        </div>
                    </div>

                    <div className="divider" />

                    {/* Log Out */}
                    <div className="settings-section">
                        <div className="settings-item danger" onClick={() => handleLinkClick('Log Out')}>
                            <LogOut size={18} />
                            <span>Log out</span>
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SettingsPanel;
