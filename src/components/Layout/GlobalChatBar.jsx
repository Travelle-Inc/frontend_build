import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './GlobalChatBar.css';

const GlobalChatBar = ({
    activeTab,
    onChatStart,
    isPrimarySidebarCollapsed,
    hasSecondarySidebar,
    isSecondarySidebarCollapsed
}) => {
    const { user, isAuthenticated } = useAuth();
    const [inputValue, setInputValue] = useState('');
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const textareaRef = useRef(null);

    // Context-aware placeholder messages based on active tab
    const getPlaceholders = () => {
        const placeholderMap = {
            flights: [
                "Need help finding flights to your destination?",
                "Want to know about flight deals?",
                "Looking for the best routes?",
                "Need assistance with flight bookings?"
            ],
            stays: [
                "Need hotel recommendations?",
                "Want to find the perfect accommodation?",
                "Looking for luxury stays?",
                "Need help with hotel bookings?"
            ],
            cars: [
                "Need a rental car?",
                "Want airport transportation?",
                "Looking for the best car deals?",
                "Need help with car rentals?"
            ],
            cruises: [
                "Dreaming of a cruise vacation?",
                "Want to explore cruise destinations?",
                "Need cruise advice?",
                "Looking for the perfect cruise?"
            ],
            experiences: [
                "Looking for things to do?",
                "Want unique local experiences?",
                "Need activity recommendations?",
                "Searching for adventures?"
            ],
            membership: [
                "Questions about membership benefits?",
                "Want to upgrade your travel experience?",
                "Need help choosing a tier?",
                "Curious about Travelle Club?"
            ],
            planner: [
                "Need help organizing your trip?",
                "Want to add destinations to your itinerary?",
                "Looking to plan your journey?",
                "Need trip planning assistance?"
            ],
            bucket_list: [
                "Ready to plan your dream destinations?",
                "Want to turn wishes into trips?",
                "Need help with your bucket list?",
                "Ready to make travel dreams reality?"
            ],
            itineraries: [
                "Need help with your itinerary?",
                "Want to optimize your travel plans?",
                "Looking to organize your trips?",
                "Need itinerary suggestions?"
            ],
            default: [
                "How can I help you today?",
                "What are you planning?",
                "Ready to explore the world?",
                "Let's plan your next adventure!"
            ]
        };

        return placeholderMap[activeTab] || placeholderMap.default;
    };

    // Rotate placeholder every 3.5 seconds
    useEffect(() => {
        const placeholders = getPlaceholders();
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [activeTab]);

    // Reset placeholder index when tab changes
    useEffect(() => {
        setPlaceholderIndex(0);
    }, [activeTab]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px';
        }
    }, [inputValue]);

    const handleSend = () => {
        if (inputValue.trim()) {
            if (onChatStart) onChatStart();
            setInputValue('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const currentPlaceholder = getPlaceholders()[placeholderIndex];

    // Calculate dynamic CSS class based on sidebar states
    const getPositionClass = () => {
        if (hasSecondarySidebar && !isSecondarySidebarCollapsed) {
            // Secondary sidebar is open
            if (isPrimarySidebarCollapsed) {
                return 'primary-collapsed-secondary-open'; // 80px + 280px = 360px
            } else {
                return 'primary-expanded-secondary-open'; // 260px + 280px = 540px
            }
        } else {
            // No secondary sidebar or it's collapsed
            if (isPrimarySidebarCollapsed) {
                return 'primary-collapsed-only'; // 80px
            } else {
                return 'primary-expanded-only'; // 260px
            }
        }
    };

    return (
        <div className={`global-chat-bar ${getPositionClass()}`}>
            <div className="global-chat-container">
                <div className="global-chat-icon">
                    <Sparkles size={20} />
                </div>
                <textarea
                    ref={textareaRef}
                    className="global-chat-input"
                    placeholder={currentPlaceholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                />
                <button 
                    className={`global-chat-send ${inputValue.trim() ? 'active' : ''}`}
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default GlobalChatBar;

