import React, { useState, useEffect } from 'react';
import TransportSearchBar from '../Chat/TransportSearchBar';
import RecentSearchCarousel from './RecentSearchCarousel';
import './SearchOnlyView.css';

const SearchOnlyView = ({ initialSearchType = 'Stays', onSearchStart }) => {
    const [searchType, setSearchType] = useState(initialSearchType);

    // Update search type when prop changes
    useEffect(() => {
        setSearchType(initialSearchType);
    }, [initialSearchType]);

    const handleSearchStart = (type, params) => {
        const actualType = type || searchType;
        setSearchType(actualType);
        // Pass both type and parameters to parent
        if (onSearchStart) onSearchStart(actualType, params);
    };

    const handleRecentSearchSelect = (search) => {
        // Determine search type from the search object
        let type = searchType;

        // If search has origin/destination, it's a flight search
        if (search.origin && search.destination) {
            type = 'Flights';
        }
        // If search has location/checkIn, it's a hotel search
        else if (search.location || search.checkIn) {
            type = 'Stays';
        }

        // Navigate to results with the selected search parameters
        if (onSearchStart) onSearchStart(type, search);
    };

    return (
        <div className="search-only-view">
            <div className="search-only-container">
                <TransportSearchBar
                    onSearch={handleSearchStart}
                    onTypeChange={setSearchType}
                    initialTab={initialSearchType}
                />

                {/* Recent Search Carousel - Changes based on search type */}
                <div className="recent-searches-section">
                    <RecentSearchCarousel
                        searchType={searchType}
                        onSearchSelect={handleRecentSearchSelect}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchOnlyView;

