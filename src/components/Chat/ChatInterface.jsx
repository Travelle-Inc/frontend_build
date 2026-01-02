import React, { useState } from 'react';
import TransportSearchBar from './TransportSearchBar';
import FlightCard from '../Cards/FlightCard';
import HotelCard from '../Cards/HotelCard';
import CarCard from '../Cards/CarCard';
import CruiseCard from '../Cards/CruiseCard';
import ExperienceCard from '../Cards/ExperienceCard';
import RecentSearchCarousel from '../Search/RecentSearchCarousel';
import AnimatedLogo from './AnimatedLogo';
import { Plane, Users, Search } from 'lucide-react';
import TravelleLogo from '../../assets/travelle_text_logo.png';
import './ChatInterface.css';

const ChatInterface = ({ viewMode = 'initial', onChatStart, onSearchStart }) => {
    // Derived state from props
    const hasSearched = viewMode === 'search_results';
    const isChatting = viewMode === 'chat_active';
    const [searchType, setSearchType] = useState('Stays');

    const handleSearchStart = (type) => {
        const actualType = type || searchType; // Use passed type or current state
        setSearchType(actualType);
        if (onSearchStart) onSearchStart(actualType); // CRITICAL: Pass type to parent
    };

    const handleChatStart = () => {
        if (onChatStart) onChatStart();
    };

    const handleRecentSearchSelect = (search) => {
        // Navigate to results with the selected search parameters
        if (onSearchStart) onSearchStart(searchType); // Pass current search type
    };

    return (
        <div className={`chat-interface ${hasSearched ? 'split-view' : ''} ${isChatting ? 'chat-mode' : ''}`}>
            {/* Search Bar:
                - Initial: Center/Bottom-ish (above chat)
                - Search Results: Top (Fixed or just Top of column)
                - Chat Active: Hidden (User said "search engine disappears")
            */}

            {/* Main Content Area */}
            <div className="chat-content-column">
                {/* Search Bar at Top if in Search Mode */}
                {hasSearched && (
                    <div className="top-search-container">
                        <TransportSearchBar onSearch={handleSearchStart} />
                    </div>
                )}

                <div className="chat-scroll-area">
                    {viewMode === 'initial' && (
                        <div className="empty-state-container">
                            <div className="hero-visual">
                                <AnimatedLogo />
                            </div>
                            <img
                                src={TravelleLogo}
                                alt="Travelle"
                                className="hero-logo-img"
                            />
                            {/* Suggestions... */}
                            {/* We can reproduce the suggestions here */}
                            <div className="input-section-stack">
                                {/* In Initial Mode: Transport Search is here */}
                                <TransportSearchBar
                                    onSearch={handleSearchStart}
                                    onTypeChange={setSearchType}
                                />

                                {/* Recent Search Carousel - Changes based on search type */}
                                <RecentSearchCarousel
                                    searchType={searchType}
                                    onSearchSelect={handleRecentSearchSelect}
                                />

                                {/* Chat Input removed - now using GlobalChatBar */}
                            </div>
                        </div>
                    )}

                    {isChatting && (
                        <div className="chat-conversation-view">
                            {/* Just chat history bubbles */}
                            <div className="message-bubble ai-message">
                                <p>Hello! Where would you like to go today?</p>
                            </div>
                            <div className="message-bubble user-message">
                                <p>I want to go to Paris!</p>
                            </div>
                        </div>
                    )}

                    {hasSearched && (
                        <div className="search-results-container">
                            {/* Results content */}
                            <div className="message-bubble ai-message">
                                <p>Found these {searchType.toLowerCase()} deals for you:</p>
                            </div>
                            <div className="results-list">
                                {searchType === 'Flights' && (
                                    <>
                                        <FlightCard
                                            airline="Qatar Airways"
                                            time="9:15am - 3:15pm"
                                            duration="6h 20m"
                                            stops="1 stop"
                                            price="1,245"
                                            logo="https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png"
                                        />
                                        <FlightCard
                                            airline="Emirates"
                                            time="10:30am - 4:45pm"
                                            duration="6h 15m"
                                            stops="Direct"
                                            price="1,350"
                                            logo="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png"
                                        />
                                    </>
                                )}

                                {searchType === 'Hotels' && (
                                    <>
                                        <HotelCard
                                            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop"
                                            title="Luxury Stay"
                                            description="A wonderful place."
                                            price="1200"
                                            rating="4.9"
                                            tags={["Luxury"]}
                                        />
                                        <HotelCard
                                            image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop"
                                            title="Five Star Hotel"
                                            description="Very comfortable."
                                            price="800"
                                            rating="4.7"
                                            tags={["Cheap"]}
                                        />
                                    </>
                                )}

                                {searchType === 'Cars' && (
                                    <>
                                        <CarCard
                                            image="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop"
                                            title="Tesla Model S"
                                            type="Electric Luxury"
                                            price="150"
                                            features={["Autopilot", "Range 400mi"]}
                                        />
                                        <CarCard
                                            image="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=600&auto=format&fit=crop"
                                            title="Mercedes C-Class"
                                            type="Luxury Sedan"
                                            price="120"
                                            features={["Leather Seats", "GPS"]}
                                        />
                                    </>
                                )}

                                {searchType === 'Cruises' && (
                                    <>
                                        <CruiseCard
                                            image="https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=600&auto=format&fit=crop"
                                            title="Caribbean Dream"
                                            line="Royal Caribbean"
                                            duration="7 Nights"
                                            price="850"
                                            rating="4.8"
                                            ports={["Miami", "Nassau", "Cozumel"]}
                                        />
                                    </>
                                )}

                                {searchType === 'Experiences' && (
                                    <>
                                        <ExperienceCard
                                            image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop"
                                            title="Eiffel Tower Tour"
                                            category="Sightseeing"
                                            duration="3 Hours"
                                            price="85"
                                            rating="4.9"
                                        />
                                        <ExperienceCard
                                            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop"
                                            title="Seine River Cruise"
                                            category="Boating"
                                            duration="1.5 Hours"
                                            price="45"
                                            rating="4.7"
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Chat Input removed - now using GlobalChatBar */}
            </div>

            {/* Map Column */}
            {hasSearched && (
                <div className="map-column">
                    <div className="map-placeholder"></div>
                </div>
            )}
        </div>
    );
};

export default ChatInterface;
