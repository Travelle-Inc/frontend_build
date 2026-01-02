import React, { useState } from 'react';
import { AlertCircle, Check } from 'lucide-react';
import FlightRouteAnimation from './FlightRouteAnimation';
import SeatMapModal from './SeatMapModal';
import './FlightResults.css';

const FlightCard = ({ flight, onAddToPlanner }) => {
    const isNearbyCity = flight.departureAirport?.isNearby || false;
    const [showSeatMap, setShowSeatMap] = useState(false);

    // Extract city names for route visualization
    const originCity = flight.departureAirport.code;
    const destinationCity = flight.destinationAirport || 'Destination';
    const layoversData = flight.layovers || [];

    return (
        <>
            <div className="flight-card">
                {/* Animated Flight Route */}
                <FlightRouteAnimation
                    origin={originCity}
                    destination={destinationCity}
                    layovers={layoversData}
                />

                {/* Airport Origin - NEW */}
                <div className={`flight-origin ${isNearbyCity ? 'nearby' : 'main'}`}>
                    {isNearbyCity ? (
                        <>
                            <AlertCircle size={12} />
                            FROM: {flight.departureAirport.code} ({flight.departureAirport.city})
                        </>
                    ) : (
                        <>
                            <Check size={12} />
                            FROM: {flight.departureAirport.code} ({flight.departureAirport.city})
                        </>
                    )}
                </div>

                {/* Flight Option Label */}
                <div className="flight-option-label">
                    Flight Option #{flight.id}
                </div>

                {/* Price - Large and Blue */}
                <div className="flight-price">
                    ${flight.price} {flight.tripType}
                </div>

                {/* Airline */}
                <div className="flight-detail">
                    <strong>Airline:</strong> {flight.airline}
                </div>

                {/* Duration */}
                <div className="flight-detail">
                    <strong>Duration:</strong> {flight.duration} | {flight.stops}
                </div>

                {/* Seat Map Preview Link */}
                <a
                    href="#"
                    className="seat-map-link"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowSeatMap(true);
                    }}
                >
                    Seat Map Preview
                </a>

                {/* Carbon Footprint */}
                <div className="carbon-footprint">
                    More info for travelers. Carbon footprint: {flight.carbonFootprint}
                </div>

                {/* Action Buttons */}
                <div className="flight-card-actions">
                    <button className="btn-add-itinerary" onClick={onAddToPlanner}>
                        Add to Planner
                    </button>
                    <button className="btn-book-now">
                        Book Now
                    </button>
                </div>
            </div>

            {/* Seat Map Modal */}
            <SeatMapModal
                isOpen={showSeatMap}
                onClose={() => setShowSeatMap(false)}
                flightInfo={{
                    origin: originCity,
                    destination: destinationCity,
                    airline: flight.airline
                }}
            />
        </>
    );
};

export default FlightCard;
