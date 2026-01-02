import React, { useState, useEffect, useRef } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import {
    Plane,
    Map,
    List,
    Settings,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    Compass,
    LayoutGrid,
    Heart,
    User,
    LogOut,
    Plus,
    Folder,
    ChevronDown,
    MessageSquare,
    Bed,
    Car,
    Ship,
    CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';
import SettingsPanel from './SettingsPanel';
import ExplorePanel from './ExplorePanel';
import LoginModal from '../Modals/LoginModal';

const Sidebar = ({
    activeTab,
    onTabChange,
    trips = [],
    onCreateTrip,
    onNavigateHome,
    onJourniiClick,
    uncategorizedChats = [],
    onOpenSettings,
    isCollapsed: controlledIsCollapsed,
    onToggleCollapse
}) => {
    const { user, isAuthenticated } = useAuth();
    // Use controlled state if provided, otherwise use internal state
    const [internalIsCollapsed, setInternalIsCollapsed] = useState(true);
    const isCollapsed = controlledIsCollapsed !== undefined ? controlledIsCollapsed : internalIsCollapsed;
    const setIsCollapsed = onToggleCollapse || setInternalIsCollapsed;

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [expandedTrips, setExpandedTrips] = useState({});
    const [uncategorizedExpanded, setUncategorizedExpanded] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);

    // Track if we're currently toggling to prevent click-outside interference
    const isTogglingRef = useRef(false);

    // Handle click outside to collapse
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Don't collapse if we're in the middle of a manual toggle
            if (isTogglingRef.current) {
                return;
            }

            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsCollapsed(true);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsCollapsed]);

    const toggleSidebar = (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Set flag to prevent click-outside from interfering
        isTogglingRef.current = true;

        setIsCollapsed(!isCollapsed);

        // Clear flag after a short delay
        setTimeout(() => {
            isTogglingRef.current = false;
        }, 100);
    };

    const handleMouseEnter = () => {
        setIsCollapsed(false);
    };

    const toggleTrip = (tripId) => {
        setExpandedTrips(prev => ({
            ...prev,
            [tripId]: !prev[tripId]
        }));
    };

    return (
        <aside
            ref={sidebarRef}
            className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}
            onMouseEnter={handleMouseEnter}
        >
            <div className="sidebar-header">
                <div className="logo-container" onClick={onNavigateHome}>
                    <div className="logo-box">
                        <img src="/logo-suitcase.png" alt="Travelle" className="logo-icon" />
                    </div>
                    {!isCollapsed && <span className="logo-text">Travelle</span>}
                </div>
                <button className="collapse-btn" onClick={toggleSidebar}>
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Navigation - Always visible */}
            <nav className="sidebar-nav">
                {/* Transport Tabs Group */}
                <div className="nav-group">
                    <NavItem
                        icon={Bed}
                        label="Stays"
                        isActive={activeTab === 'stays'}
                        onClick={() => onTabChange('stays')}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={Plane}
                        label="Flights"
                        isActive={activeTab === 'flights'}
                        onClick={() => onTabChange('flights')}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={Car}
                        label="Cars"
                        isActive={activeTab === 'cars'}
                        onClick={() => onTabChange('cars')}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={Ship}
                        label="Cruises"
                        isActive={activeTab === 'cruises'}
                        onClick={() => onTabChange('cruises')}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={Compass}
                        label="Things To Do"
                        isActive={activeTab === 'experiences'}
                        onClick={() => onTabChange('experiences')}
                        isCollapsed={isCollapsed}
                    />
                </div>

                {/* Separator */}
                {!isCollapsed && <div className="nav-separator"></div>}

                {/* Journii AI */}
                <div className="nav-group">
                    <div
                        className={`nav-item ${activeTab === 'journii' ? 'active' : ''} ${isCollapsed ? 'icon-only' : ''}`}
                        onClick={onJourniiClick}
                    >
                        <Sparkles size={20} className="nav-icon" />
                        {!isCollapsed && <span>Journii Ai</span>}
                    </div>
                </div>

                {/* Separator */}
                {!isCollapsed && <div className="nav-separator"></div>}

                {/* Other Tabs Group */}
                <div className="nav-group">
                    <NavItem
                        icon={Heart}
                        label="Bucket List"
                        isActive={activeTab === 'bucket_list'}
                        onClick={() => onTabChange('bucket_list')}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={List}
                        label="Itineraries"
                        isActive={activeTab === 'itineraries'}
                        onClick={() => onTabChange('itineraries')}
                        isCollapsed={isCollapsed}
                    />
                    <NavItem
                        icon={CreditCard}
                        label="Membership"
                        isActive={activeTab === 'membership'}
                        onClick={() => onTabChange('membership')}
                        isCollapsed={isCollapsed}
                        hasGlow={!isAuthenticated}
                    />
                </div>
            </nav>

            {/* Folders and Chats - Only when expanded */}
            {!isCollapsed && (
                <>
                    {/* Trip Action Buttons */}
                    <div className="sidebar-divider"></div>

                    {isAuthenticated ? (
                        <>
                            <div className="trip-action-buttons">
                                <div style={{ flex: 1 }}>
                                    <button
                                        className="trip-action-btn"
                                        onClick={onCreateTrip}
                                    >
                                        <Plus size={14} />
                                        <span>New Trip</span>
                                    </button>
                                </div>

                                <button className="trip-action-btn" onClick={() => onTabChange('planner')}>
                                    <LayoutGrid size={14} />
                                    <span>Planner</span>
                                </button>
                            </div>

                            {/* Trips/Folders Section */}
                            <div className="folders-section-primary">
                                {trips.map(trip => (
                                    <FolderGroup
                                        key={trip.id}
                                        trip={trip}
                                        isExpanded={expandedTrips[trip.id]}
                                        toggleTrip={() => toggleTrip(trip.id)}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="planner-login-prompt">
                            <div className="planner-login-icon">
                                <LayoutGrid size={32} />
                            </div>
                            <h3>Access Your Planner</h3>
                            <p>Log in to create trips, organize your travel plans, and access all your saved destinations.</p>
                        </div>
                    )}

                    {/* Uncategorized Chats */}
                    <div className="uncategorized-chats-section">
                        <div
                            className="section-header-collapsible"
                            onClick={() => setUncategorizedExpanded(!uncategorizedExpanded)}
                        >
                            {uncategorizedExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                            <span>UNCATEGORIZED CHATS</span>
                        </div>
                        {uncategorizedExpanded && (
                            <Droppable droppableId="uncategorized-chats" type="SIDEBAR_ITEM">
                                {(provided) => (
                                    <div
                                        className="chat-items-list"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {uncategorizedChats.map((chat, index) => (
                                            <Draggable
                                                key={`chat-${chat.id}`}
                                                draggableId={`chat-${chat.id}`}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`chat-item-primary ${chat.isActive ? 'active' : ''}`}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            opacity: snapshot.isDragging ? 0.5 : 1
                                                        }}
                                                    >
                                                        <MessageSquare size={12} />
                                                        <span className="chat-name">{chat.name}</span>
                                                        {chat.hasIndicator && (
                                                            <span className={`chat-indicator ${chat.indicatorColor}`}></span>
                                                        )}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        )}
                    </div>
                </>
            )
            }

            {/* Uncategorized Chats */}
            {/* ... */}

            <ExplorePanel
                isOpen={isExploreOpen}
                onClose={() => setIsExploreOpen(false)}
            />

            <div className="sidebar-footer">
                {isAuthenticated && (
                    <SettingsPanel
                        isOpen={isSettingsOpen}
                        onClose={() => setIsSettingsOpen(false)}
                        onNavigate={onOpenSettings}
                    />
                )}

                {isAuthenticated ? (
                    <div className="user-profile">
                        <div className="avatar">
                            <img src={user?.avatar || "/profile-ilya.jpg"} alt="User" />
                        </div>
                        {!isCollapsed && (
                            <div className="user-info">
                                <span className="user-name">{user?.name || 'User'}</span>
                                <span className="user-handle">{user?.username || '@user'}</span>
                            </div>
                        )}
                        {!isCollapsed && (
                            <button
                                className="settings-cog-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsExploreOpen(false); // Close other panel
                                    setIsSettingsOpen(!isSettingsOpen);
                                }}
                            >
                                <Settings size={18} />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="auth-buttons">
                        {!isCollapsed ? (
                            <>
                                <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>
                                    Log In
                                </button>
                                <button className="signup-btn" onClick={() => setIsLoginModalOpen(true)}>
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <button className="login-btn-collapsed" onClick={() => setIsLoginModalOpen(true)}>
                                <User size={20} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </aside >
    );
};

// Folder Group Component with Drag-to-Expand logic
const FolderGroup = ({ trip, isExpanded, toggleTrip }) => {
    // We wrap the header in a Droppable to detect drag over
    // and use it to trigger expansion
    const expandTimeoutRef = useRef(null);

    // If we want to strictly drop ONTO the folder to add to "default" section, 
    // we can use this droppable. For now, it's primarily for detection.

    return (
        <Droppable droppableId={`folder-header-${trip.id}`} type="SIDEBAR_ITEM">
            {(provided, snapshot) => {
                // Effect to handle expansion on hover
                useEffect(() => {
                    if (snapshot.isDraggingOver && !isExpanded) {
                        // Start timer if dragging over and collapsed
                        if (!expandTimeoutRef.current) {
                            expandTimeoutRef.current = setTimeout(() => {
                                toggleTrip();
                            }, 600); // 600ms delay
                        }
                    } else {
                        // Clear timer if not dragging over or already expanded
                        if (expandTimeoutRef.current) {
                            clearTimeout(expandTimeoutRef.current);
                            expandTimeoutRef.current = null;
                        }
                    }

                    return () => {
                        if (expandTimeoutRef.current) {
                            clearTimeout(expandTimeoutRef.current);
                        }
                    };
                }, [snapshot.isDraggingOver, isExpanded, toggleTrip]);

                return (
                    <div className="folder-group" ref={provided.innerRef} {...provided.droppableProps}>
                        <div
                            className="folder-header"
                            onClick={toggleTrip}
                            style={{
                                backgroundColor: snapshot.isDraggingOver ? 'rgba(0, 0, 0, 0.05)' : undefined
                            }}
                        >
                            <div className="folder-left">
                                {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                <Folder size={14} />
                                <span className="folder-name">{trip.name}</span>
                            </div>
                            <span className="folder-count">{trip.sections.length}</span>
                        </div>

                        {/* We hide the droppable placeholder because we don't actually want to drop here visually unless we support it */}
                        <div style={{ display: 'none' }}>{provided.placeholder}</div>

                        {isExpanded && (
                            <div className="folder-children">
                                {trip.sections.map(section => (
                                    <SectionItem
                                        key={section.id}
                                        section={section}
                                        tripId={trip.id}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            }}
        </Droppable>
    );
};

// Section Item Component with expandable items
const SectionItem = ({ section, tripId }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getItemIcon = (itemType) => {
        switch (itemType) {
            case 'link':
                return Compass; // Link icon
            case 'image':
                return LayoutGrid; // Image icon  
            case 'video':
                return Heart; // Video icon
            case 'text':
            default:
                return MessageSquare;
        }
    };

    const formatItemContent = (item) => {
        if (item.type === 'link') {
            // Extract domain from URL
            try {
                const url = new URL(item.content);
                return url.hostname.replace('www.', '');
            } catch {
                return item.content.substring(0, 30);
            }
        } else if (item.type === 'image') {
            return '📷 Image';
        } else if (item.type === 'video') {
            return '🎥 Video';
        } else {
            // Text - truncate
            return item.content.length > 35 ? item.content.substring(0, 35) + '...' : item.content;
        }
    };

    return (
        <Droppable droppableId={`section-${tripId}-${section.id}`} type="SIDEBAR_ITEM">
            {(provided, snapshot) => (
                <div
                    className="section-item-container"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <div
                        className="folder-child-item section-header-item"
                        onClick={() => setIsExpanded(!isExpanded)}
                        style={{
                            backgroundColor: snapshot.isDraggingOver ? 'rgba(0, 0, 0, 0.05)' : undefined
                        }}
                    >
                        {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                        <MessageSquare size={12} />
                        <span>{section.name}</span>
                        {section.items.length > 0 && (
                            <span className="item-count-badge">{section.items.length}</span>
                        )}
                    </div>
                    {isExpanded && (
                        <div className="section-items-list">
                            {section.items.map((item, index) => {
                                const ItemIcon = getItemIcon(item.type);
                                return (
                                    <Draggable
                                        key={`item-${item.id}`}
                                        draggableId={`item-${tripId}-${section.id}-${item.id}`}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="section-item"
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    opacity: snapshot.isDragging ? 0.5 : 1
                                                }}
                                            >
                                                <ItemIcon size={10} />
                                                <span className="item-content-text">
                                                    {formatItemContent(item)}
                                                </span>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                    {/* Hidden placeholder when not expanded but dragging over? 
                        Ideally we want to always render placeholder if we want to drop INTO it, 
                        but if it's collapsed, we might just drop ONTO the header.
                        For now, standard list implementation requires placeholder in the list.
                        If collapsed, we can't really "reorder" inside. We can only "add". 
                        If we want to drop into a collapsed folder, it's tricker. 
                        Let's render placeholder outside if needed or keep it simple.
                     */}
                    {!isExpanded && (
                        <div style={{ display: 'none' }}>{provided.placeholder}</div>
                    )}
                </div>
            )}
        </Droppable>
    );
};

const NavItem = ({ icon: Icon, label, isActive, onClick, hasSubmenu, isCollapsed, hasGlow }) => {
    return (
        <div
            className={`nav-item ${isActive ? 'active' : ''} ${isCollapsed ? 'icon-only' : ''} ${hasGlow ? 'glow-effect' : ''}`}
            onClick={onClick}
        >
            <Icon size={20} className="nav-icon" />
            {!isCollapsed && (
                <>
                    <span className="nav-label">{label}</span>
                    {hasSubmenu && <ChevronRight size={14} className="submenu-arrow" />}
                </>
            )}
        </div>
    );
};

export default Sidebar;
