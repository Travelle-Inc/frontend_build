import React from 'react';
import { X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
    const { login } = useAuth();

    if (!isOpen) return null;

    const handleDemoLogin = () => {
        // Login with demo user data
        login({
            name: 'Ilya Belous',
            email: 'ilya@travelle.inc',
            username: '@ilyabelous',
            avatar: '/profile-ilya.jpg'
        });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="login-modal-content">
                    {/* Logo/Icon */}
                    <div className="login-icon">
                        <img src="/logo-suitcase.png" alt="Travelle" className="login-logo" />
                    </div>

                    {/* Title */}
                    <h2 className="login-title">Welcome to Travelle</h2>

                    {/* Demo Mode Badge */}
                    <div className="demo-mode-badge">
                        <span className="demo-badge-icon">🎭</span>
                        <span className="demo-badge-text">DEMO MODE</span>
                    </div>

                    {/* Description */}
                    <p className="login-description">
                        Experience Travelle with a demo account. Click below to continue as Ilya Belous.
                    </p>

                    {/* Demo User Card */}
                    <div className="demo-user-card">
                        <div className="demo-user-avatar">
                            <img src="/profile-ilya.jpg" alt="Ilya Belous" />
                        </div>
                        <div className="demo-user-info">
                            <div className="demo-user-name">Ilya Belous</div>
                            <div className="demo-user-email">ilya@travelle.inc</div>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button className="demo-login-btn" onClick={handleDemoLogin}>
                        <User size={18} />
                        <span>Continue as Demo User</span>
                    </button>

                    {/* Footer Note */}
                    <p className="login-footer-note">
                        This is a demonstration account with sample data.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;

