import React, { useState } from 'react';
import {
    Plus,
    ArrowRight,
    Search,
    Send,
    Paperclip,
    Calendar,
    User,
    Plane,
    Bed,
    Car,
    Ship,
    Compass,
    Briefcase
} from 'lucide-react';
import './InputArea.css';

const InputArea = () => {
    // Toggle for showing the "Search Bar" (Kayak style)
    // In the design, it seems to always be there or maybe contextual.
    // The user said "i want a multi-transportation search to be above the chat input... to show that i want one included there"
    // So I will make it visible.

    return (
        <div className="input-area-container">
            {/* Transportation Search Bar (Top Layer) */}
            <div className="transport-search-bar">
                {/* Transportation Tabs & Packages */}
                <div className="search-pill-group">
                    <button className="search-pill">
                        <div className="icon-box"><Bed size={18} /></div>
                        Hotels
                    </button>
                    <button className="search-pill active">
                        <div className="icon-box"><Plane size={18} /></div>
                        Flights
                    </button>
                    <button className="search-pill">
                        <div className="icon-box"><Car size={18} /></div>
                        Cars
                    </button>
                    <button className="search-pill">
                        <div className="icon-box"><Ship size={18} /></div>
                        Cruises
                    </button>
                    <button className="search-pill">
                        <div className="icon-box"><Compass size={18} /></div>
                        Experiences
                    </button>

                    {/* Divider vertical removed, handled by margin/styles if needed, logic: flex gap handles it */}

                    <button className="search-pill packages-btn">
                        <div className="icon-box"><Briefcase size={18} /></div>
                        Packages
                    </button>
                </div>

                {/* Location & Date Inputs */}
                <div className="search-inputs-row">
                    <div className="location-input-group">
                        <span className="input-label">Location</span>
                        <input type="text" placeholder="Search destination" className="location-input" />
                    </div>
                    {/* No arrow divider */}
                    <div className="location-input-group">
                        <span className="input-label">Check in</span>
                        <input type="text" placeholder="Add dates" className="location-input" />
                    </div>
                    <div className="location-input-group">
                        <span className="input-label">Check out</span>
                        <input type="text" placeholder="Add dates" className="location-input" />
                    </div>

                    <div className="date-input-group">
                        <span className="input-label">Guests</span>
                        <input type="text" placeholder="Add guests" className="date-input" />
                    </div>

                    <button className="search-action-btn">
                        <Search size={20} color="white" />
                    </button>
                </div>
            </div>

            {/* Main Chat Input (Bottom Layer) */}
            <div className="chat-input-wrapper">
                <textarea
                    placeholder="Tell me your destination, dates, and preferences..."
                    className="chat-textarea"
                    rows={1}
                />
                <div className="chat-actions">
                    <button className="attach-btn" title="Add Image">
                        <Plus size={20} />
                    </button>
                    <div className="right-actions">
                        <button className="voice-btn" title="Voice Input">
                            {/* Placeholder icon or mic */}
                            <span style={{ fontSize: '18px' }}>↓</span>
                        </button>
                        <button className="send-btn">
                            <Send size={18} fill="white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputArea;
