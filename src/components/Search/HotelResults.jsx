import React, { useState } from 'react';
import HotelCard from './HotelCard';
import './HotelResults.css';

const HotelResults = ({ initialSearchParams, onAddToPlanner }) => {

    const [activeView, setActiveView] = useState('Map');
    const [searchParams] = useState(initialSearchParams || {
        destination: 'Paris, France',
        checkIn: '12/10/2024',
        checkOut: '12/15/2024',
        guests: 4,
        rooms: 2
    });

    // Dynamic Hotel Generation based on destination
    const generateHotels = () => {
        const dest = searchParams.destination || 'Paris';

        // Define base templates for different cities to make them feel authentic
        const cityThemes = {
            'Paris': { suffix: 'Paris', style: 'Historic', currency: '€' },
            'Tokyo': { suffix: 'Tokyo', style: 'Modern', currency: '¥' },
            'New York': { suffix: 'NYC', style: 'Urban', currency: '$' },
            'Dubai': { suffix: 'Dubai', style: 'Luxury', currency: 'AED' },
            'Barcelona': { suffix: 'Barcelona', style: 'Coastal', currency: '€' },
            'London': { suffix: 'London', style: 'Royal', currency: '£' }
        };

        const cityKey = Object.keys(cityThemes).find(k => dest.includes(k)) || 'Paris';
        const theme = cityThemes[cityKey];

        return [
            {
                id: 1,
                name: `Grand Palace Hotel ${theme.suffix}`,
                location: `City Center, ${theme.suffix} • 0.8 km from center`,
                description: `Modern business hotel with state-of-the-art conference facilities, executive lounge, and premium amenities designed for corporate travelers in ${theme.suffix}.`,
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
                badge: { type: 'best-cancellation', text: 'Best Cancellation' },
                stars: 5,
                rating: 4.8,
                reviews: 1247,
                amenities: ['Free WiFi', 'Breakfast', 'Parking', 'Fitness Center', 'Pool', 'Spa'],
                nights: 3,
                priceRange: '$894 - $1,950',
                rooms: [
                    {
                        type: 'Standard Room',
                        price: '$135/night',
                        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=150&fit=crop'
                    },
                    {
                        type: 'Deluxe Suite',
                        price: '$185/night',
                        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=150&fit=crop'
                    },
                    {
                        type: 'Family Room',
                        price: '$245/night',
                        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&h=150&fit=crop'
                    },
                    {
                        type: 'Executive Suite',
                        price: '$298/night',
                        image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=200&h=150&fit=crop'
                    }
                ]
            },
            {
                id: 2,
                name: `Boutique Art Hotel ${theme.suffix}`,
                location: `Arts District, ${theme.suffix} • 1.2 km from center`,
                description: 'Charming boutique hotel featuring contemporary art, stylish interiors, and personalized service in the heart of the cultural district.',
                image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop',
                badge: { type: 'pay-later', text: 'Pay Later' },
                stars: 4,
                rating: 4.6,
                reviews: 823,
                amenities: ['Free WiFi', 'Breakfast', 'Restaurant', 'Bar'],
                nights: 3,
                priceRange: '$495 - $855',
                rooms: [
                    {
                        type: 'Classic Room',
                        price: '$95/night',
                        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=200&h=150&fit=crop'
                    },
                    {
                        type: 'Superior Room',
                        price: '$125/night',
                        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=200&h=150&fit=crop'
                    },
                    {
                        type: 'Junior Suite',
                        price: '$165/night',
                        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=200&h=150&fit=crop'
                    }
                ]
            },
            {
                id: 3,
                name: `${theme.style} Executive Stay`,
                location: `Business District, ${theme.suffix} • 5.8 km from center`,
                description: 'Professional accommodation near business district with excellent transport links, meeting rooms, and all essential business services.',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
                badge: { type: 'best-eco', text: 'Best Eco-friendly' },
                stars: 4,
                rating: 4.5,
                reviews: 956,
                amenities: ['Free WiFi', 'Parking', 'Fitness Center', 'Business Center'],
                nights: 3,
                priceRange: '$405 - $730',
                rooms: [
                    {
                        type: 'Business Room',
                        price: '$85/night',
                        image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=200&h=150&fit=crop'
                    },
                    {
                        type: 'Executive Room',
                        price: '$115/night',
                        image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?w=200&h=150&fit=crop'
                    },
                    {
                        type: 'Suite',
                        price: '$155/night',
                        image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=200&h=150&fit=crop'
                    }
                ]
            }
        ];
    };

    const mockHotels = generateHotels();

    return (
        <div className="hotel-results-container">
            {/* Top Bar with View Toggle */}
            <div className="results-top-bar">
                <h2 className="results-heading">Hotel Search Results</h2>
                <p className="results-subtext">{searchParams.destination} - {searchParams.guests} Adults</p>

                <div className="view-toggles">
                    <button
                        className={`view-btn ${activeView === 'List' ? 'active' : ''}`}
                        onClick={() => setActiveView('List')}
                    >
                        ☰ List
                    </button>
                    <button
                        className={`view-btn ${activeView === 'Map' ? 'active' : ''}`}
                        onClick={() => setActiveView('Map')}
                    >
                        🗺️ Map
                    </button>
                    <button
                        className={`view-btn ${activeView === 'Split' ? 'active' : ''}`}
                        onClick={() => setActiveView('Split')}
                    >
                        ⚡ Split
                    </button>
                </div>
            </div>

            {/* Hotel Cards Grid */}
            <div className="hotel-results-grid">
                {mockHotels.map((hotel) => (
                    <HotelCard
                        key={hotel.id}
                        hotel={hotel}
                        onAddToPlanner={() => onAddToPlanner(hotel)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HotelResults;
