import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Bed, Plane, Car, Ship, Compass, Search, MapPin, Calendar, Users, Briefcase } from 'lucide-react';
import DateRangePicker from './DateRangePicker';
import LocationAutocomplete from './LocationAutocomplete';
import TravelerSelector from './TravelerSelector';
import './InputArea.css';

const TransportSearchBar = ({ onSearch, onTypeChange, initialTab = 'Stays' }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    // Date Picker State
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const dateInputRef = useRef(null);

    // Update active tab when initialTab prop changes
    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    useEffect(() => {
        // Notify parent when tab changes
        if (onTypeChange) {
            onTypeChange(activeTab);
        }
        // Reset dates on tab change (Optional, but cleaner for different contexts)
        setDateRange({ start: null, end: null });
    }, [activeTab, onTypeChange]);

    // NOTE: Click-outside handling is now done by DateRangePicker itself
    // No need for duplicate handler here since dropdown is portaled

    const handleSearch = () => {
        if (onSearch) onSearch(activeTab, { dateRange, origin, destination, travelers, cabinClass });
    };

    const handleDateSelect = (start, end) => {
        setDateRange({ start, end });
        // Don't auto-close - let user review their selection
        // They can click outside or press the close button to dismiss
    };

    const formatDateRangeDisplay = () => {
        if (dateRange.start && dateRange.end) {
            return `${dateRange.start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ${dateRange.end.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`;
        }
        if (dateRange.start) {
            return `${dateRange.start.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - ...`;
        }
        // User asked to removeplaceholder text for dates. So we return empty string.
        return "";
    };

    const tabs = [
        { id: 'Stays', icon: Bed, label: 'Stays' },
        { id: 'Flights', icon: Plane, label: 'Flights' },
        { id: 'Cars', icon: Car, label: 'Cars' },
        { id: 'Cruises', icon: Ship, label: 'Cruises' },
        { id: 'Experiences', icon: Compass, label: 'Things to do' },
    ];

    // Shared Date Input Renderer
    const renderDateInput = () => (
        <div className="date-input-group" ref={dateInputRef} style={{ position: 'relative' }}>
            <span className="input-label">Dates</span> {/* Hidden via CSS */}
            <div
                className="input-with-icon"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent closing immediately
                    setIsDatePickerOpen(!isDatePickerOpen);
                }}
                style={{ cursor: 'pointer' }}
            >
                <Calendar size={18} className="input-inner-icon" />
                {dateRange.start && (
                    <div className="date-input has-value" style={{ lineHeight: '24px', fontSize: '0.9rem', color: '#1e293b' }}>
                        {formatDateRangeDisplay()}
                    </div>
                )}
            </div>
            {isDatePickerOpen && ReactDOM.createPortal(
                <DateRangePicker
                    triggerRef={dateInputRef}
                    inModal={true}
                    onClose={() => setIsDatePickerOpen(false)}
                    onSelect={handleDateSelect}
                />,
                document.body
            )}
        </div>
    );

    // Traveler Selector State
    const [isTravelerSelectorOpen, setIsTravelerSelectorOpen] = useState(false);
    const [travelers, setTravelers] = useState({
        adults: 1,
        students: 0,
        seniors: 0,
        youths: 0,
        children: 0,
        toddlers: 0,
        infants: 0
    });
    const [cabinClass, setCabinClass] = useState('Economy');
    const [hasSelectedTravelers, setHasSelectedTravelers] = useState(false); // Track if user has made a selection
    const travelerRef = useRef(null);

    // NOTE: Click-outside handling is now done by TravelerSelector itself
    // No need for duplicate handler here since dropdown is portaled

    const getTotalTravelers = () => {
        return Object.values(travelers).reduce((a, b) => a + b, 0);
    };

    const getTravelerString = () => {
        // Show placeholder if user hasn't made a selection yet
        if (!hasSelectedTravelers) {
            return 'Travelers, Class';
        }

        const total = getTotalTravelers();
        const travelerText = `${total} Traveler${total !== 1 ? 's' : ''}`;
        return `${travelerText}, ${cabinClass}`;
    };

    // Traveler Input Renderer (Replaces simple select)
    const renderTravelerInput = () => (
        <div className="date-input-group" ref={travelerRef} style={{ position: 'relative' }}>
            <span className="input-label">Travelers</span>
            <div
                className="input-with-icon"
                onClick={() => {
                    setIsTravelerSelectorOpen(!isTravelerSelectorOpen);
                    // Mark as selected when user opens the selector
                    if (!hasSelectedTravelers) {
                        setHasSelectedTravelers(true);
                    }
                }}
                style={{ cursor: 'pointer' }}
            >
                <Users size={18} className="input-inner-icon" />
                <div
                    className="date-input has-value"
                    style={{
                        lineHeight: '24px',
                        fontSize: '0.9rem',
                        color: hasSelectedTravelers ? '#1e293b' : '#94a3b8' // Lighter color for placeholder
                    }}
                >
                    {getTravelerString()}
                </div>
            </div>
            {isTravelerSelectorOpen && ReactDOM.createPortal(
                <TravelerSelector
                    triggerRef={travelerRef}
                    inModal={true}
                    isOpen={isTravelerSelectorOpen}
                    onClose={() => setIsTravelerSelectorOpen(false)}
                    travelers={travelers}
                    onTravelerChange={setTravelers}
                    cabinClass={cabinClass}
                    onCabinChange={setCabinClass}
                />,
                document.body
            )}
        </div>
    );

    // --- Tab Specific Renderers ---

    const renderStaysInputs = () => (
        <>
            <div className="search-inputs-row">
                <div className="location-input-group" style={{ flex: 1.5 }}>
                    <span className="input-label">Where to?</span>
                    <LocationAutocomplete placeholder="Where to?" onSelect={(loc) => setDestination(loc)} />
                </div>

                {renderDateInput()}

                {renderTravelerInput()}

                <button className="search-action-btn" onClick={handleSearch}>
                    <Search size={20} color="white" />
                </button>
            </div>
            <div className="extra-options-row">
                <label className="checkbox-label">
                    <input type="checkbox" /> Add a flight
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" /> Add a car
                </label>
            </div>
        </>
    );

    const renderFlightsInputs = () => (
        <>
            <div className="sub-tabs-row">
                <button className="sub-tab active">Roundtrip</button>
                <button className="sub-tab">One-way</button>
                <button className="sub-tab">Multi-city</button>
            </div>
            <div className="search-inputs-row">
                <div className="location-input-group" style={{ flex: 1.5 }}>
                    <span className="input-label">Leaving from</span>
                    <LocationAutocomplete placeholder="Where from?" onSelect={(loc) => setOrigin(loc)} />
                </div>
                <div className="location-input-group" style={{ flex: 1.5, borderLeft: '1px solid var(--border-subtle)' }}>
                    <span className="input-label">Going to</span>
                    <LocationAutocomplete placeholder="Where to?" onSelect={(loc) => setDestination(loc)} />
                </div>

                {renderDateInput()}

                {renderTravelerInput()}

                <button className="search-action-btn" onClick={handleSearch}>
                    <Search size={20} color="white" />
                </button>
            </div>
            <div className="extra-options-row">
                <label className="checkbox-label">
                    <input type="checkbox" /> Add a place to stay
                </label>
                <label className="checkbox-label">
                    <input type="checkbox" /> Add a car
                </label>
            </div>
        </>
    );

    const renderCarsInputs = () => (
        <>
            <div className="sub-tabs-row">
                <button className="sub-tab active">Rental cars</button>
                <button className="sub-tab">Airport transportation</button>
            </div>
            <div className="search-inputs-row">
                <div className="location-input-group">
                    <span className="input-label">Pick-up</span>
                    <LocationAutocomplete placeholder="Where from?" onSelect={(loc) => console.log(loc)} />
                </div>
                <div className="location-input-group">
                    <span className="input-label">Drop-off</span>
                    <LocationAutocomplete placeholder="Where to?" onSelect={(loc) => console.log(loc)} />
                </div>

                {renderDateInput()}

                <div className="date-input-group" style={{ maxWidth: '100px' }}>
                    <span className="input-label">Time</span>
                    <input type="text" className="date-input" defaultValue="10:30am" />
                </div>
                <div className="date-input-group" style={{ maxWidth: '100px' }}>
                    <span className="input-label">Time</span>
                    <input type="text" className="date-input" defaultValue="10:30am" />
                </div>
                <button className="search-action-btn" onClick={handleSearch}>
                    <Search size={20} color="white" />
                </button>
            </div>
            <div className="extra-options-row">
                <button className="pill-btn">Show AARP rates</button>
                <button className="pill-btn">Discount codes</button>
            </div>
        </>
    );

    const renderCruisesInputs = () => (
        <>
            <div className="extra-options-row" style={{ marginBottom: '8px', marginTop: 0 }}>
                <span className="sub-text">For expert cruise advice, call 1-866-403-9848.</span>
            </div>
            <div className="search-inputs-row">
                <div className="location-input-group" style={{ flex: 1.5 }}>
                    <span className="input-label">Destinations</span>
                    <LocationAutocomplete placeholder="Where to?" onSelect={(loc) => console.log(loc)} />
                </div>

                {renderDateInput()}

                <div className="date-input-group">
                    <span className="input-label">Duration</span>
                    <div className="input-with-icon">
                        <Briefcase size={18} className="input-inner-icon" />
                        <input type="text" className="date-input" />
                    </div>
                </div>
                <button className="search-action-btn" onClick={handleSearch}>
                    <Search size={20} color="white" />
                </button>
            </div>
        </>
    );

    const renderExperiencesInputs = () => (
        <>
            <div className="search-inputs-row">
                <div className="location-input-group" style={{ flex: 2 }}>
                    <span className="input-label">Where to?</span>
                    <LocationAutocomplete placeholder="Where to?" onSelect={(loc) => console.log(loc)} />
                </div>

                {renderDateInput()}

                <button className="search-action-btn" onClick={handleSearch}>
                    <Search size={20} color="white" />
                </button>
            </div>
        </>
    );

    return (
        <div className="transport-search-bar">
            {/* Transportation Tabs */}
            <div className="search-pill-group">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            className={`search-pill ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <div className="icon-box"><Icon size={18} /></div>
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            <div className="transport-content-area">
                {activeTab === 'Stays' && renderStaysInputs()}
                {activeTab === 'Flights' && renderFlightsInputs()}
                {activeTab === 'Cars' && renderCarsInputs()}
                {activeTab === 'Cruises' && renderCruisesInputs()}
                {activeTab === 'Experiences' && renderExperiencesInputs()}
            </div>
        </div>
    );
};

export default TransportSearchBar;
