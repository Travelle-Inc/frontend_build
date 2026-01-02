import React from 'react';
import { Ship, Star } from 'lucide-react';
import './HotelCard.css'; // Reusing HotelCard CSS

const CruiseCard = ({ image, title, line, duration, price, rating, ports }) => {
    return (
        <div className="hotel-card">
            <div className="hotel-image-container">
                <img src={image} alt={title} className="hotel-image" />
            </div>
            <div className="hotel-details">
                <div className="hotel-header">
                    <h3 className="hotel-title">{title}</h3>
                    <div className="hotel-actions">
                        <button className="book-btn-small">Book Cabin</button>
                        <button className="save-btn-small"><Star size={16} /></button>
                    </div>
                </div>

                <p className="hotel-description">{line} • {duration}</p>

                <div className="hotel-tags">
                    {ports.slice(0, 2).map((port, idx) => (
                        <span key={idx} className="hotel-tag">{port}</span>
                    ))}

                    <div className="hotel-price-block">
                        <span className="hotel-price">${price}</span>
                        <span className="hotel-period">per person</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CruiseCard;
