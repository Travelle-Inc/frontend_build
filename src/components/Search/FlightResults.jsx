import React, { useState, useEffect } from 'react';
import FlightCard from './FlightCard';
import SearchBarPersistent from './SearchBarPersistent';
import './FlightResults.css';

const FlightResults = ({ initialSearchParams, onAddToPlanner }) => {
    const [activeTab, setActiveTab] = useState('Results');
    const [searchParams, setSearchParams] = useState(initialSearchParams || {
        origin: 'New York, NY',
        destination: 'Rome, Italy',
        departDate: '12/10/2024',
        returnDate: '02/12/2024',
        travelers: 2,
        class: 'Economy',
        includeNearby: true
    });

    // Mock airports database
    const nearbyAirports = {
        'New York, NY': [
            { code: 'JFK', name: 'JFK International', city: 'New York', isNearby: false },
            { code: 'LGA', name: 'LaGuardia', city: 'New York', isNearby: false },
            { code: 'EWR', name: 'Newark Liberty', city: 'Newark', isNearby: true }
        ],
        'Los Angeles, CA': [
            { code: 'LAX', name: 'LAX International', city: 'Los Angeles', isNearby: false },
            { code: 'BUR', name: 'Burbank', city: 'Burbank', isNearby: true },
            { code: 'SNA', name: 'John Wayne', city: 'Santa Ana', isNearby: true }
        ]
    };

    // Get airports based on search params
    const getApplicableAirports = () => {
        const airports = nearbyAirports[searchParams.origin] || [
            { code: 'JFK', name: 'Default', city: searchParams.origin.split(',')[0], isNearby: false }
        ];

        if (searchParams.includeNearby) {
            return airports;
        } else {
            return airports.filter(a => !a.isNearby);
        }
    };

    // Calculate unique cities count
    const getCitiesCount = () => {
        const airports = getApplicableAirports();
        const uniqueCities = new Set(airports.map(a => a.city));
        return uniqueCities.size;
    };

    // Generate mock flights from applicable airports
    const generateFlights = () => {
        const airports = getApplicableAirports();
        const flights = [];
        let id = 1;

        airports.forEach(airport => {
            // Each airport gets 3 flight options
            for (let i = 0; i < 3; i++) {
                const hasLayover = i > 0;
                flights.push({
                    id: id++,
                    price: 450 + Math.floor(Math.random() * 100),
                    tripType: 'Roundtrip',
                    airline: 'Exampledair',
                    duration: '1h 30m',
                    stops: hasLayover ? '1 Stop' : 'Nonstop',
                    carbonFootprint: '120kg CO2',
                    departureAirport: airport,
                    destinationAirport: 'FCO',
                    layovers: hasLayover ? [{ city: 'ATL', duration: '45m' }] : []
                });
            }
        });

        return flights.sort((a, b) => a.price - b.price);
    };

    const [flights, setFlights] = useState(generateFlights());

    // Save search to localStorage
    const saveSearch = (params) => {
        const saved = JSON.parse(localStorage.getItem('recentFlightSearches') || '[]');
        const newSearch = {
            ...params,
            timestamp: Date.now()
        };
        const updated = [newSearch, ...saved.filter((s, i) => i < 4)]; // Keep last 5
        localStorage.setItem('recentFlightSearches', JSON.stringify(updated));
    };

    const handleSearch = (newParams) => {
        setSearchParams(newParams);
        saveSearch(newParams);
        // Regenerate flights based on new params
        setFlights(generateFlights());
    };

    const handleSelectRecentSearch = (search) => {
        setSearchParams(search);
        setFlights(generateFlights());
    };

    useEffect(() => {
        // Regenerate flights when search params change
        setFlights(generateFlights());
    }, [searchParams.includeNearby]);

    const citiesCount = getCitiesCount();

    return (
        <div className="flight-results-container">
            {/* Persistent Search Bar at Top */}
            <SearchBarPersistent
                searchParams={searchParams}
                onSearch={handleSearch}
            />

            {/* Results Info Bar */}
            <div className="results-info-bar">
                <div className="search-tabs">
                    <button
                        className={`search-tab ${activeTab === 'Results' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Results')}
                    >
                        Results
                    </button>
                    <button
                        className={`search-tab ${activeTab === 'Calendar' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Calendar')}
                    >
                        📅 Calendar
                    </button>
                    <button
                        className={`search-tab ${activeTab === 'Map' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Map')}
                    >
                        🗺️ Map
                    </button>

                    <div className="results-count">
                        Showing flights from {citiesCount} {citiesCount === 1 ? 'city' : 'cities'}
                    </div>
                </div>
            </div>

            {/* Flight Results Grid */}
            <div className="flight-results-main">
                <div className="flight-results-grid">
                    {flights.map((flight) => (
                        <FlightCard
                            key={flight.id}
                            flight={flight}
                            onAddToPlanner={() => onAddToPlanner(flight)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlightResults;
