import React from 'react';
import { Car, Star } from 'lucide-react';
import './HotelCard.css'; // Reusing HotelCard CSS for consistent styling

const CarCard = ({ image, title, type, price, rating, features }) => {
    return (
        <div className="hotel-card"> {/* Reusing card class */}
            <div className="hotel-image-container">
                <img src={image} alt={title} className="hotel-image" />
            </div>
            <div className="hotel-details">
                <div className="hotel-header">
                    <h3 className="hotel-title">{title}</h3>
                    <div className="hotel-actions">
                        <button className="book-btn-small">Rent Now</button>
                        <button className="save-btn-small"><Star size={16} /></button>
                    </div>
                </div>

                <p className="hotel-description">{type} • {features.join(' • ')}</p>

                <div className="hotel-tags">
                    <div className="hotel-tag">Unlimited Mileage</div>

                    <div className="hotel-price-block">
                        <span className="hotel-price">${price}</span>
                        <span className="hotel-period">per day</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
