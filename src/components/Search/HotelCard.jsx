import React, { useRef } from 'react';
import { Star, MapPin, Heart, ChevronLeft, ChevronRight, Wifi, Coffee, Car } from 'lucide-react';
import './HotelCard.css';

const HotelCard = ({ hotel, onAddToPlanner }) => {
    const roomScrollRef = useRef(null);

    const scrollRooms = (direction) => {
        if (roomScrollRef.current) {
            const scrollAmount = 200;
            roomScrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!hotel) return null;

    return (
        <div className="hotel-card">
            {/* Hotel Main Image - This is now the Drag Handle */}
            <div className="hotel-image-container">
                <img src={hotel.image} alt={hotel.name} className="hotel-main-image" />
                {hotel.badge && (
                    <div className={`hotel-badge hotel-badge-${hotel.badge.type}`}>
                        {hotel.badge.text}
                    </div>
                )}
                <button className="hotel-fav-btn">
                    <Heart size={18} />
                </button>
            </div>

            {/* Hotel Info */}
            <div className="hotel-info-section">
                <h3 className="hotel-name">{hotel.name}</h3>

                <div className="hotel-location">
                    <MapPin size={14} />
                    <span>{hotel.location}</span>
                </div>

                <div className="hotel-rating-row">
                    <div className="hotel-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={14}
                                fill={star <= hotel.stars ? '#fbbf24' : 'none'}
                                stroke={star <= hotel.stars ? '#fbbf24' : '#cbd5e1'}
                            />
                        ))}
                    </div>
                    <span className="score">{hotel.rating}</span>
                    <span className="reviews">({hotel.reviews} reviews)</span>
                </div>

                {hotel.description && (
                    <p className="hotel-description">{hotel.description}</p>
                )}

                <div className="hotel-amenities">
                    {hotel.amenities && hotel.amenities.slice(0, 4).map((amenity, i) => (
                        <div key={i} className="amenity-item">
                            <Wifi size={12} />
                            <span>{amenity}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Room Types */}
            {hotel.rooms && hotel.rooms.length > 0 && (
                <div className="room-types-section">
                    <h4 className="room-types-title">Room Types</h4>
                    <div className="room-carousel-container">
                        <button className="room-scroll-btn room-scroll-btn-left" onClick={() => scrollRooms('left')}>
                            <ChevronLeft size={16} />
                        </button>
                        <div className="room-types-scroll" ref={roomScrollRef}>
                            {hotel.rooms.map((room, idx) => (
                                <div key={idx} className="room-option">
                                    <img src={room.image} alt={room.type} className="room-image" />
                                    <div className="room-details">
                                        <div className="room-type-name">{room.type}</div>
                                        <div className="room-price">{room.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="room-scroll-btn room-scroll-btn-right" onClick={() => scrollRooms('right')}>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="hotel-card-footer">
                <div className="hotel-pricing">
                    <span className="price-label">Hotel for {hotel.nights} nights | incl. taxes & fees</span>
                    <div className="price-range">{hotel.priceRange}</div>
                </div>
                <div className="hotel-actions">
                    <button className="btn-bucket-list" onClick={onAddToPlanner}>Add to Planner</button>
                    <button className="btn-add-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
