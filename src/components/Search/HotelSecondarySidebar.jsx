import React from 'react';
import RecentSearches from './RecentSearches';
import './HotelSecondarySidebar.css';

const HotelSecondarySidebar = ({ onSelectSearch }) => {
    return (
        <div className="hotel-secondary-sidebar">
            {/* Recent Searches */}
            <RecentSearches onSelectSearch={onSelectSearch} searchType="Hotels" />

            <div className="sidebar-divider"></div>

            {/* Hotel Filters */}
            <div className="hotel-filters-section">
                <h3 className="filters-title">Filters</h3>

                {/* Price Range */}
                <div className="filter-group">
                    <h4>Price Range (per night)</h4>
                    <input type="range" min="0" max="1000" className="price-slider" />
                    <div className="price-range-labels">
                        <span>$0</span>
                        <span>$1000+</span>
                    </div>
                </div>

                {/* Star Rating */}
                <div className="filter-group">
                    <h4>Star Rating</h4>
                    <div className="checkbox-group">
                        {[5, 4, 3, 2, 1].map(stars => (
                            <label key={stars} className="checkbox-label">
                                <input type="checkbox" />
                                <span>{'★'.repeat(stars)} & up</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Property Type */}
                <div className="filter-group">
                    <h4>Property Type</h4>
                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Hotel</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Apartment</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Motel</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Resort</span>
                        </label>
                    </div>
                </div>

                {/* Amenities */}
                <div className="filter-group">
                    <h4>Amenities</h4>
                    <div className="checkbox-group">
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Free WiFi</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Free Breakfast</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Pool</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Parking</span>
                        </label>
                        <label className="checkbox-label">
                            <input type="checkbox" />
                            <span>Fitness Center</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelSecondarySidebar;
