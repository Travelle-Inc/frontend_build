import React, { useState, useEffect } from 'react';
import { Calendar, Users, MapPin } from 'lucide-react';
import './RecentSearchCards.css';

const RecentSearchCards = ({ onSearchSelect }) => {
    const [recentSearches, setRecentSearches] = useState([]);

    // City to Unsplash image mapping
    const cityImages = {
        'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
        'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
        'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
        'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
        'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop',
        'Los Angeles': 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&h=300&fit=crop',
        'Miami': 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=400&h=300&fit=crop',
        'Barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop',
        'Dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
        'Singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop',
        'Sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=300&fit=crop',
        'Amsterdam': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=300&fit=crop',
        'Berlin': 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&h=300&fit=crop',
        'Madrid': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop',
        'Istanbul': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop',
        'Default': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop'
    };

    useEffect(() => {
        // Load from localStorage
        const saved = localStorage.getItem('recentFlightSearches');
        if (saved) {
            const searches = JSON.parse(saved);
            setRecentSearches(searches.slice(0, 4)); // Show max 4
        }
    }, []);

    const getDestinationImage = (destination) => {
        // Extract city name from destination string
        const cityName = destination.split(',')[0].trim();
        return cityImages[cityName] || cityImages['Default'];
    };

    const formatDate = (dateString) => {
        // Simple date formatting
        return dateString;
    };

    if (recentSearches.length === 0) {
        return (
            <div className="no-recent-searches">
                <MapPin size={48} strokeWidth={1} />
                <h3>No Recent Searches</h3>
                <p>Your recent flight searches will appear here</p>
            </div>
        );
    }

    return (
        <div className="recent-searches-container">
            <h2 className="recent-searches-title">Recent Searches</h2>
            <div className="recent-search-cards">
                {recentSearches.map((search, index) => (
                    <div
                        key={index}
                        className="recent-search-card"
                        onClick={() => onSearchSelect?.(search)}
                    >
                        {/* Destination Image */}
                        <div className="card-image-container">
                            <img
                                src={getDestinationImage(search.destination)}
                                alt={search.destination}
                                className="card-image"
                            />
                            <div className="image-overlay"></div>
                        </div>

                        {/* Card Content */}
                        <div className="card-content">
                            <h3 className="route-title">
                                {search.origin.split(',')[0]} - {search.destination.split(',')[0]}
                            </h3>

                            <div className="card-details">
                                <div className="detail-item">
                                    <Calendar size={14} />
                                    <span>{formatDate(search.departDate)} - {formatDate(search.returnDate)}</span>
                                </div>

                                <div className="detail-item">
                                    <Users size={14} />
                                    <span>{search.travelers} {search.travelers === 1 ? 'Adult' : 'Adults'}</span>
                                </div>
                            </div>

                            <div className="card-footer">
                                <span className="search-class">{search.class}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentSearchCards;
