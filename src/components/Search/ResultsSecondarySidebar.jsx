import React from 'react';
import RecentSearches from './RecentSearches';
import FiltersCollapsible from './FiltersCollapsible';
import './FlightResults.css';

const ResultsSecondarySidebar = ({ onSelectSearch }) => {
    return (
        <div className="results-secondary-sidebar">
            <RecentSearches onSelectSearch={onSelectSearch} searchType="Flights" />
            <div className="sidebar-divider"></div>
            <FiltersCollapsible />
        </div>
    );
};

export default ResultsSecondarySidebar;
