import React from 'react';
import { Star, MapPin } from 'lucide-react';
import './HotelCard.css';

const HotelCard = ({ image, title, description, price, rating, tags }) => {
    return (
        <div className="hotel-card">
            <div className="hotel-image-container">
                <img src={image} alt={title} className="hotel-image" />
            </div>
            <div className="hotel-details">
                <div className="hotel-header">
                    <h3 className="hotel-title">{title}</h3>
                    <div className="hotel-actions">
                        <button className="book-btn-small">Book Now</button>
                        <button className="save-btn-small"><Star size={16} /></button>
                    </div>
                </div>

                <p className="hotel-description">{description}</p>

                <div className="hotel-tags">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="hotel-tag">{tag}</span>
                    ))}

                    <div className="hotel-price-block">
                        <span className="hotel-price">${price}</span>
                        <span className="hotel-period">per night</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
