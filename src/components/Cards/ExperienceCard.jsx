import React from 'react';
import { Compass, Star } from 'lucide-react';
import './HotelCard.css'; // Reusing HotelCard CSS

const ExperienceCard = ({ image, title, duration, price, rating, category }) => {
    return (
        <div className="hotel-card">
            <div className="hotel-image-container">
                <img src={image} alt={title} className="hotel-image" />
            </div>
            <div className="hotel-details">
                <div className="hotel-header">
                    <h3 className="hotel-title">{title}</h3>
                    <div className="hotel-actions">
                        <button className="book-btn-small">Book Activity</button>
                        <button className="save-btn-small"><Star size={16} /></button>
                    </div>
                </div>

                <p className="hotel-description">{category} • {duration}</p>

                <div className="hotel-tags">
                    <span className="hotel-tag">Guided Tour</span>

                    <div className="hotel-price-block">
                        <span className="hotel-price">${price}</span>
                        <span className="hotel-period">per person</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceCard;
