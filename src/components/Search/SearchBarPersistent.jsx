import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import './FlightResults.css';

const SearchBarPersistent = ({ searchParams, onSearch }) => {
    const [origin, setOrigin] = useState(searchParams?.origin || 'New York, NY');
    const [destination, setDestination] = useState(searchParams?.destination || 'Rome, Italy');
    const [departDate, setDepartDate] = useState(searchParams?.departDate || '12/10/2024');
    const [returnDate, setReturnDate] = useState(searchParams?.returnDate || '02/12/2024');
    const [travelers, setTravelers] = useState(searchParams?.travelers || 2);
    const [travelClass, setTravelClass] = useState(searchParams?.class || 'Economy');
    const [includeNearby, setIncludeNearby] = useState(searchParams?.includeNearby || false);

    const handleSearch = () => {
        onSearch?.({
            origin,
            destination,
            departDate,
            returnDate,
            travelers,
            class: travelClass,
            includeNearby
        });
    };

    return (
        <div className="search-bar-persistent">
            <div className="search-fields-row">
                {/* Origin */}
                <div className="search-field">
                    <label>From</label>
                    <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        placeholder="Origin city"
                    />
                    <label className="nearby-checkbox">
                        <input
                            type="checkbox"
                            checked={includeNearby}
                            onChange={(e) => setIncludeNearby(e.target.checked)}
                        />
                        <span>Include nearby airports</span>
                    </label>
                </div>

                {/* Destination */}
                <div className="search-field">
                    <label>To</label>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Destination"
                    />
                </div>

                {/* Depart Date */}
                <div className="search-field">
                    <label>Departure</label>
                    <input
                        type="text"
                        value={departDate}
                        onChange={(e) => setDepartDate(e.target.value)}
                    />
                </div>

                {/* Return Date */}
                <div className="search-field">
                    <label>Return</label>
                    <input
                        type="text"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />
                </div>

                {/* Travelers & Class */}
                <div className="search-field">
                    <label>Travelers & Class</label>
                    <div className="travelers-class">
                        <input
                            type="number"
                            min="1"
                            value={travelers}
                            onChange={(e) => setTravelers(e.target.value)}
                            className="travelers-input"
                        />
                        <select
                            value={travelClass}
                            onChange={(e) => setTravelClass(e.target.value)}
                            className="class-select"
                        >
                            <option>Economy</option>
                            <option>Premium Economy</option>
                            <option>Business</option>
                            <option>First</option>
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <button className="search-button-persistent" onClick={handleSearch}>
                    Search Flights
                </button>
            </div>
        </div>
    );
};

export default SearchBarPersistent;
