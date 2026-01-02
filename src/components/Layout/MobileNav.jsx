import React, { useState } from 'react';
import {
    Bed,
    Plane,
    Car,
    Ship,
    Compass,
    Menu,
    X,
    Sparkles,
    Heart,
    List,
    CreditCard,
    LayoutGrid,
    Plus,
    Settings,
    User,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDrawer } from '../../hooks/useResponsive';
import LoginModal from '../Modals/LoginModal';
import './MobileNav.css';

const MobileNav = ({
    activeTab,
    onTabChange,
    trips = [],
    onCreateTrip,
    onNavigateHome,
    onJourniiClick,
    onOpenSettings
}) => {
    const { user, isAuthenticated, logout } = useAuth();
    const { isOpen: isMenuOpen, open: openMenu, close: closeMenu, toggle: toggleMenu } = useDrawer();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // Main bottom nav items (transport categories)
    const bottomNavItems = [
        { id: 'stays', icon: Bed, label: 'Stays' },
        { id: 'flights', icon: Plane, label: 'Flights' },
        { id: 'journii', icon: Sparkles, label: 'Journii' },
        { id: 'cars', icon: Car, label: 'Cars' },
        { id: null, icon: Menu, label: 'More', isMenu: true }
    ];

    // Menu drawer items
    const menuItems = [
        { id: 'cruises', icon: Ship, label: 'Cruises' },
        { id: 'experiences', icon: Compass, label: 'Things To Do' },
        { type: 'divider' },
        { id: 'bucket_list', icon: Heart, label: 'Bucket List' },
        { id: 'itineraries', icon: List, label: 'Itineraries' },
        { id: 'membership', icon: CreditCard, label: 'Membership' },
        { type: 'divider' },
        { id: 'planner', icon: LayoutGrid, label: 'Planner' }
    ];

    const handleBottomNavClick = (item) => {
        if (item.isMenu) {
            toggleMenu();
        } else if (item.id === 'journii') {
            onJourniiClick?.();
        } else {
            onTabChange?.(item.id);
        }
    };

    const handleMenuItemClick = (itemId) => {
        closeMenu();
        if (itemId === 'planner') {
            onTabChange?.('planner');
        } else {
            onTabChange?.(itemId);
        }
    };

    return (
        <>
            {/* Bottom Navigation Bar */}
            <nav className="mobile-bottom-nav">
                {bottomNavItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = item.isMenu ? isMenuOpen : activeTab === item.id;
                    
                    return (
                        <button
                            key={item.id || `menu-${index}`}
                            className={`mobile-nav-item ${isActive ? 'active' : ''} ${item.id === 'journii' ? 'journii-item' : ''}`}
                            onClick={() => handleBottomNavClick(item)}
                        >
                            <Icon size={22} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Menu Drawer Backdrop */}
            <div 
                className={`drawer-backdrop ${isMenuOpen ? 'open' : ''}`}
                onClick={closeMenu}
            />

            {/* Menu Drawer */}
            <div className={`slide-drawer-right mobile-menu-drawer ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <div className="menu-logo" onClick={() => { closeMenu(); onNavigateHome?.(); }}>
                        <img src="/logo-suitcase.png" alt="Travelle" className="menu-logo-img" />
                        <span>Travelle</span>
                    </div>
                    <button className="menu-close-btn" onClick={closeMenu}>
                        <X size={24} />
                    </button>
                </div>

                {/* User Profile Section */}
                <div className="mobile-menu-user">
                    {isAuthenticated ? (
                        <div className="menu-user-info">
                            <img src={user?.avatar || "/profile-ilya.jpg"} alt="User" className="menu-avatar" />
                            <div className="menu-user-details">
                                <span className="menu-user-name">{user?.name || 'User'}</span>
                                <span className="menu-user-handle">{user?.username || '@user'}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="menu-auth-buttons">
                            <button className="menu-login-btn" onClick={() => { closeMenu(); setIsLoginModalOpen(true); }}>
                                Log In
                            </button>
                            <button className="menu-signup-btn" onClick={() => { closeMenu(); setIsLoginModalOpen(true); }}>
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>

                {/* Menu Items */}
                <div className="mobile-menu-items">
                    {menuItems.map((item, index) => {
                        if (item.type === 'divider') {
                            return <div key={`divider-${index}`} className="menu-divider" />;
                        }
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                className={`mobile-menu-item ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => handleMenuItemClick(item.id)}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                                <ChevronRight size={16} className="menu-item-arrow" />
                            </button>
                        );
                    })}
                </div>

                {/* Trips Section (if authenticated) */}
                {isAuthenticated && trips.length > 0 && (
                    <div className="mobile-menu-trips">
                        <div className="menu-section-header">
                            <span>My Trips</span>
                            <button className="menu-add-trip-btn" onClick={() => { closeMenu(); onCreateTrip?.(); }}>
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="menu-trips-list">
                            {trips.slice(0, 5).map(trip => (
                                <button
                                    key={trip.id}
                                    className="menu-trip-item"
                                    onClick={() => { closeMenu(); onTabChange?.('planner'); }}
                                >
                                    <LayoutGrid size={16} />
                                    <span>{trip.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="mobile-menu-footer">
                    {isAuthenticated && (
                        <>
                            <button
                                className="menu-footer-btn"
                                onClick={() => { closeMenu(); onOpenSettings?.('profile'); }}
                            >
                                <Settings size={20} />
                                <span>Settings</span>
                            </button>
                            <button className="menu-footer-btn logout" onClick={logout}>
                                <LogOut size={20} />
                                <span>Log Out</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </>
    );
};

export default MobileNav;

