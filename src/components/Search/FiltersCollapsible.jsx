import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FlightResults.css';

const FiltersCollapsible = ({ onFilterChange }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [priceRange, setPriceRange] = useState(1000);
    const [selectedTimes, setSelectedTimes] = useState(['Evening']);
    const [selectedStops, setSelectedStops] = useState([]);

    const departureTimeOptions = [
        { id: 'early-morning', label: 'Early Morning' },
        { id: 'morning', label: 'Morning' },
        { id: 'afternoon', label: 'Afternoon' },
        { id: 'evening', label: 'Evening' },
        { id: 'late-night', label: 'Late Night' }
    ];

    const stopsOptions = [
        { id: 'nonstop', label: 'Nonstop' },
        { id: '1-stop', label: '1 Stop' },
        { id: '2-plus', label: '2+ Stops' }
    ];

    const handleTimeChange = (timeLabel) => {
        setSelectedTimes(prev => {
            if (prev.includes(timeLabel)) {
                return prev.filter(t => t !== timeLabel);
            } else {
                return [...prev, timeLabel];
            }
        });
    };

    const handleStopsChange = (stopId) => {
        setSelectedStops(prev => {
            if (prev.includes(stopId)) {
                return prev.filter(s => s !== stopId);
            } else {
                return [...prev, stopId];
            }
        });
    };

    const handleClearAll = () => {
        setPriceRange(1000);
        setSelectedTimes([]);
        setSelectedStops([]);
    };

    return (
        <div className="filters-collapsible-section">
            <div className="filters-header-collapsible" onClick={() => setIsExpanded(!isExpanded)}>
                <h4>Filters</h4>
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>

            {isExpanded && (
                <div className="filters-content">
                    <button className="clear-all-btn-inline" onClick={handleClearAll}>
                        Clear All
                    </button>

                    {/* Price Range */}
                    <div className="filter-section">
                        <h5>Price Range</h5>
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
                        <h5>Departure Times</h5>
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

                    {/* Stops */}
                    <div className="filter-section">
                        <h5>Stops</h5>
                        <div className="checkbox-group">
                            {stopsOptions.map(option => (
                                <label key={option.id} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedStops.includes(option.id)}
                                        onChange={() => handleStopsChange(option.id)}
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FiltersCollapsible;
