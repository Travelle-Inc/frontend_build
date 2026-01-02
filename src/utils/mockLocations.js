export const popularLocations = [
    { id: 'NYC', name: 'New York City', subtext: 'New York, United States', type: 'city' },
    { id: 'LON', name: 'London', subtext: 'United Kingdom', type: 'city' },
    { id: 'PAR', name: 'Paris', subtext: 'France', type: 'city' },
    { id: 'TYO', name: 'Tokyo', subtext: 'Japan', type: 'city' },
    { id: 'DBX', name: 'Dubai', subtext: 'United Arab Emirates', type: 'city' },
    { id: 'SIN', name: 'Singapore', subtext: 'Singapore', type: 'city' },
    { id: 'FCO', name: 'Rome', subtext: 'Italy', type: 'city' },
    { id: 'BCN', name: 'Barcelona', subtext: 'Spain', type: 'city' },
    { id: 'AMS', name: 'Amsterdam', subtext: 'Netherlands', type: 'city' },
    { id: 'SYD', name: 'Sydney', subtext: 'Australia', type: 'city' },
    // Airports
    { id: 'JFK', name: 'John F. Kennedy Intl', subtext: 'New York, USA', type: 'airport' },
    { id: 'LHR', name: 'Heathrow Airport', subtext: 'London, UK', type: 'airport' },
    { id: 'CDG', name: 'Charles de Gaulle', subtext: 'Paris, France', type: 'airport' },
    { id: 'HND', name: 'Haneda Airport', subtext: 'Tokyo, Japan', type: 'airport' },
    { id: 'DXB', name: 'Dubai Intl', subtext: 'Dubai, UAE', type: 'airport' },
    { id: 'LAX', name: 'Los Angeles Intl', subtext: 'California, USA', type: 'airport' },
    { id: 'SFO', name: 'San Francisco Intl', subtext: 'California, USA', type: 'airport' },
    { id: 'MIA', name: 'Miami Intl', subtext: 'Florida, USA', type: 'airport' },
];

export const searchLocations = (query) => {
    if (!query || query.length < 2) return [];
    const lowerQuery = query.toLowerCase();
    return popularLocations.filter(loc =>
        loc.name.toLowerCase().includes(lowerQuery) ||
        loc.subtext.toLowerCase().includes(lowerQuery) ||
        loc.id.toLowerCase().includes(lowerQuery)
    );
};
