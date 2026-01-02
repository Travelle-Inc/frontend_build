import React, { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import './RecentSearches.css';

const RecentSearches = ({ onSelectSearch, searchType = 'Flights' }) => {
    const [recentSearches, setRecentSearches] = useState([]);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        // Load from localStorage based on searchType
        const storageKey = searchType === 'Hotels' ? 'recentHotelSearches' : 'recentFlightSearches';
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, [searchType]);

    const formatSearchLabel = (search) => {
        if (searchType === 'Hotels') {
            return `${search.destination || search.location}, ${search.checkIn || search.departDate}`;
        }
        return `${search.origin} → ${search.destination}, ${search.departDate}`;
    };

    const displayCount = isExpanded ? 5 : 1;

    return (
        <div className="recent-searches-section">
            <h4 onClick={() => setIsExpanded(!isExpanded)} className="recent-searches-header">
                <div className="header-content">
                    <Clock size={16} />
                    Recent Searches
                </div>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </h4>
            {recentSearches.length === 0 ? (
                <p className="no-searches">No recent searches</p>
            ) : (
                <div className={`recent-searches-list ${isExpanded ? 'expanded' : 'collapsed'}`}>
                    {recentSearches.slice(0, displayCount).map((search, index) => (
                        <div
                            key={index}
                            className="recent-search-item"
                            onClick={() => onSelectSearch?.(search)}
                        >
                            <span className="search-label">{formatSearchLabel(search)}</span>
                            <span className="search-meta">
                                {search.travelers || search.guests} {searchType === 'Hotels' ? 'guests' : 'travelers'} • {search.class || 'Standard'}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentSearches;
