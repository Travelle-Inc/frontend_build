import React from 'react';
import { SquarePen, Search, PanelLeftClose, Trash2, PanelRightOpen } from 'lucide-react';
import './SecondarySidebar.css';

const SecondarySidebar = ({ onCollapse, isCollapsed, onExpand }) => {
    if (isCollapsed) {
        return (
            <div className="secondary-sidebar-collapsed" onClick={onExpand}>
                <PanelRightOpen size={20} />
            </div>
        );
    }

    return (
        <aside className="secondary-sidebar">
            <div className="sec-header">
                <div className="app-title-row">
                    <div className="app-icon-blue">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </div>
                    <span className="app-name">Chat</span>
                    <button className="collapse-btn-small" onClick={onCollapse}>
                        <PanelLeftClose size={16} />
                    </button>
                </div>
            </div>

            <div className="sec-actions">
                <button className="new-chat-btn">
                    <SquarePen size={18} />
                    New Chat
                </button>
                <div className="sec-search-input">
                    <Search size={16} />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="history-section">
                <div className="history-group">
                    <div className="history-title">TODAY</div>
                    <div className="history-list">
                        <div className="history-item">Planning summer vacation</div>
                        <div className="history-item">Best restaurants in Tokyo</div>
                        <div className="history-item">Flight options to Paris</div>
                    </div>
                </div>

                <div className="history-group">
                    <div className="history-title">THIS WEEK</div>
                    <div className="history-list">
                        <div className="history-item">Hotel recommendations Rome</div>
                        <div className="history-item">Weekend getaway ideas</div>
                        <div className="history-item">Travel insurance options</div>
                    </div>
                </div>
            </div>

            <div className="deleted-chats-section">
                <div className="deleted-header">
                    <Trash2 size={16} />
                    <span>Deleted Chats</span>
                </div>
            </div>
        </aside>
    );
};

export default SecondarySidebar;
