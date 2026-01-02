import React from 'react';
import { Star } from 'lucide-react';
import './FlightCard.css';

const FlightCard = ({ airline, time, duration, stops, price, logo }) => {
    return (
        <div className="flight-card">
            <div className="flight-row top-row">
                <div className="airline-info">
                    <img src={logo} alt={airline} className="airline-logo" />
                    <span className="airline-name">{airline}</span>
                </div>
                <div className="flight-action">
                    <button className="book-btn">Book Now</button>
                    <button className="save-btn"><Star size={16} /></button>
                </div>
            </div>

            <div className="flight-row details-row">
                <div className="flight-segment">
                    <span className="time">{time}</span>
                    <span className="route">LHR - JFK • {duration} • {stops}</span>
                </div>
                <div className="price-tag">
                    ${price}
                </div>
            </div>

            <div className="flight-row details-row">
                <div className="flight-segment">
                    <span className="time">{time}</span> {/* Return flight dummy */}
                    <span className="route">JFK - LHR • {duration} • {stops}</span>
                </div>
                <div className="fare-class">
                    Economy
                </div>
            </div>
        </div>
    );
};

export default FlightCard;
