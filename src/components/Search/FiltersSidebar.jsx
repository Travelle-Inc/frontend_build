import React, { useState } from 'react';
import './FlightResults.css';

const FiltersSidebar = ({ onFilterChange }) => {
    const [priceRange, setPriceRange] = useState(1000);
    const [selectedTimes, setSelectedTimes] = useState(['Evening']);

    const departureTimeOptions = [
        { id: 'early-morning', label: 'Early Morning' },
        { id: 'morning', label: 'Morning' },
        { id: 'afternoon', label: 'Afternoon' },
        { id: 'evening', label: 'Evening' },
        { id: 'late-night', label: 'Late Night' }
    ];

    const handleTimeChange = (timeId) => {
        setSelectedTimes(prev => {
            if (prev.includes(timeId)) {
                return prev.filter(t => t !== timeId);
            } else {
                return [...prev, timeId];
            }
        });
    };

    const handleClearAll = () => {
        setPriceRange(1000);
        setSelectedTimes([]);
    };

    return (
        <div className="filters-sidebar">
            <div className="filters-header">
                <h3>⬇️ Filters</h3>
                <button className="clear-all-btn" onClick={handleClearAll}>
                    Clear All
                </button>
            </div>

            {/* Price Range */}
            <div className="filter-section">
                <h4>Price Range</h4>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="price-slider"
                />
                <div className="price-range-values">
                    <span>$0</span>
                    <span>${priceRange}</span>
                </div>
            </div>

            {/* Departure Times */}
            <div className="filter-section">
                <h4>Departure Times</h4>
                <div className="checkbox-group">
                    {departureTimeOptions.map(option => (
                        <label key={option.id} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={selectedTimes.includes(option.label)}
                                onChange={() => handleTimeChange(option.label)}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FiltersSidebar;
