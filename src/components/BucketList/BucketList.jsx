import React from 'react';
import { Plus, MapPin, Calendar, BookOpen, Users } from 'lucide-react';
import './BucketList.css';

const BucketList = () => {
    const trips = [
        {
            id: 1,
            title: 'Kyoto, Japan',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
            status: 'Planned',
            date: 'Apr 2025 • 10 Days',
            description: 'Exploring ancient temples, tea ceremonies, and the blooming sakura gardens.'
        },
        {
            id: 2,
            title: 'Santorini, Greece',
            image: 'https://images.unsplash.com/photo-1613395877344-13d4c79e4df1?q=80&w=800&auto=format&fit=crop',
            status: 'Draft',
            date: 'Saved for later',
            description: 'Sunset views in Oia, sailing the caldera, and wine tasting tours.'
        },
        {
            id: 3,
            title: 'Machu Picchu, Peru',
            image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=800&auto=format&fit=crop',
            status: 'Planned',
            date: 'Oct 2025 • 7 Days',
            description: 'Hiking the Inca Trail and exploring the Sacred Valley.'
        }
    ];

    return (
        <div className="bucket-list-container">
            <header className="bucket-header">
                <div className="header-left">
                    <h1>My Bucket List</h1>
                    <p>Manage your saved destinations and start planning your next adventure.</p>
                </div>
                <button className="add-trip-btn">
                    <Plus size={18} /> Add New Trip
                </button>
            </header>

            <div className="bucket-grid">
                {trips.map(trip => (
                    <div key={trip.id} className="trip-card">
                        <div className="card-image-wrapper">
                            <img src={trip.image} alt={trip.title} className="card-image" />
                        </div>
                        <div className="card-content">
                            <div className="card-header-row">
                                <h3 className="destination-title">{trip.title}</h3>
                                <span className={`status-badge ${trip.status.toLowerCase()}`}>{trip.status}</span>
                            </div>
                            <div className="trip-meta">
                                <Calendar size={14} />
                                <span>{trip.date}</span>
                            </div>
                            <p className="trip-description">{trip.description}</p>

                            <div className="card-actions">
                                <button className="action-btn primary-action">
                                    <MapPin size={16} /> Plan
                                </button>
                                <button className="action-btn">
                                    <BookOpen size={16} /> Book
                                </button>
                                <button className="action-btn">
                                    <Users size={16} /> Invite
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create New Card Placeholder */}
                <div className="create-new-card">
                    <div className="plus-circle">
                        <Plus size={24} />
                    </div>
                    <span className="create-text">Create New Trip</span>
                    <span className="create-subtext">Start from scratch or use AI</span>
                </div>
            </div>
        </div>
    );
};

export default BucketList;
