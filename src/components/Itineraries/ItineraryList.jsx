import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Briefcase, User, ArrowRight, Heart, CreditCard, Edit3 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import ExpandedItineraryCard from './ExpandedItineraryCard';
import ItineraryBuilder from './ItineraryBuilder';
import BookingSimulation from './BookingSimulation';
import './ItineraryList.css';

const ItineraryList = ({ onAddTripToPlanner, onNavigateToPlanner }) => {
    const [activeFilter, setActiveFilter] = useState('All Plans');
    const [expandedCardId, setExpandedCardId] = useState(null);
    const [isBuilderOpen, setIsBuilderOpen] = useState(false);
    const [bookingItinerary, setBookingItinerary] = useState(null);
    const [itineraries, setItineraries] = useState([
        {
            id: 1,
            title: 'Summer in Rome & Florence',
            image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
            date: 'Aug 12 - Aug 24, 2025',
            status: 'Upcoming',
            meta: { cities: '2 Cities', activities: '14 Activities' },
            type: null,
            days: [
                {
                    id: 'day-1-1',
                    date: 'August 12, 2025',
                    weather: 'sunny',
                    temperature: '82°F',
                    dailyCost: '$240',
                    bgImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
                    activities: [
                        { id: 'act-1-1-1', time: '10:00 AM', title: 'Arrive at CDG Airport', location: 'Transportation', cost: '$0' },
                        { id: 'act-1-1-2', time: '1:30 PM', title: 'Check into Hotel Marin Opera', location: 'Activity', cost: '$0' },
                        { id: 'act-1-1-3', time: '6:00 PM', title: 'Evening walk along Seine', location: 'Activity', cost: '$0' },
                        { id: 'act-1-1-4', time: '8:00 PM', title: 'Dinner at local bistro', location: 'Activity', cost: '$65' }
                    ]
                },
                {
                    id: 'day-1-2',
                    date: 'August 13, 2025',
                    weather: 'cloudy',
                    temperature: '78°F',
                    dailyCost: '$180',
                    bgImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
                    activities: [
                        { id: 'act-1-2-1', time: '9:00 AM', title: 'Visit Louvre Museum', location: 'Activity', cost: '$20' },
                        { id: 'act-1-2-2', time: '12:30 PM', title: 'Lunch near Louvre', location: 'Dining', cost: '$35' },
                        { id: 'act-1-2-3', time: '3:00 PM', title: 'Walk through Tuileries Garden', location: 'Activity', cost: '$0' },
                        { id: 'act-1-2-4', time: '7:00 PM', title: 'Dinner at Le Marais', location: 'Dining', cost: '$55' }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'Tokyo Tech Conference',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop',
            date: 'Nov 05 - Nov 10, 2024',
            status: 'Completed',
            meta: { cities: '1 City', type: 'Business' },
            type: 'Business',
            days: []
        },
        {
            id: 3,
            title: 'Swiss Alps Hiking Adventure',
            image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop',
            date: 'Flexible Dates • 7 Days',
            status: 'Draft',
            meta: { cities: 'Interlaken', type: 'Solo Trip' },
            type: 'Solo Trip',
            days: [
                {
                    id: 'day-3-1',
                    date: 'TBD',
                    weather: 'snowy',
                    temperature: '45°F',
                    dailyCost: '$150',
                    bgImage: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
                    activities: [
                        { id: 'act-3-1-1', time: '9:00 AM', title: 'Hiking Tour', location: 'Activity', cost: '$80' },
                        { id: 'act-3-1-2', time: '12:00 PM', title: 'Mountain Lunch', location: 'Dining', cost: '$40' }
                    ]
                }
            ]
        }
    ]);

    const handleExpandCard = (id) => {
        setExpandedCardId(expandedCardId === id ? null : id);
    };

    const handleBuilderComplete = (newItinerary) => {
        setItineraries([newItinerary, ...itineraries]);
    };

    const handleAddToBucketList = (itinId) => {
        setItineraries(itineraries.map(itin =>
            itin.id === itinId ? { ...itin, status: 'Bucket List' } : itin
        ));
    };

    const handleBookNow = (itinerary) => {
        setBookingItinerary(itinerary);
    };

    const handleBookingComplete = (itinerary, bookingDetails) => {
        // Update itinerary status to Upcoming
        setItineraries(itineraries.map(itin =>
            itin.id === itinerary.id ? { ...itin, status: 'Upcoming' } : itin
        ));

        // Add to planner if handler provided
        if (onAddTripToPlanner) {
            onAddTripToPlanner(itinerary, bookingDetails);
        }

        setBookingItinerary(null);

        // Navigate to planner if handler provided
        if (onNavigateToPlanner) {
            onNavigateToPlanner();
        }
    };

    const filteredItineraries = itineraries.filter(itin => {
        if (activeFilter === 'All Plans') return true;
        if (activeFilter === 'Upcoming') return itin.status === 'Upcoming';
        if (activeFilter === 'Completed') return itin.status === 'Completed';
        if (activeFilter === 'Drafts') return itin.status === 'Draft';
        if (activeFilter === 'Bucket List') return itin.status === 'Bucket List';
        return true;
    });

    return (
        <div className="itinerary-list-container">
            <header className="itinerary-header">
                <div className="header-left">
                    <h1>My Itineraries</h1>
                    <p>View, edit, and manage your detailed travel plans.</p>
                </div>
                <button className="new-itinerary-btn" onClick={() => setIsBuilderOpen(true)}>
                    <Plus size={18} /> New Itinerary
                </button>
            </header>

            <div className="filter-tabs">
                {['All Plans', 'Upcoming', 'Completed', 'Drafts', 'Bucket List'].map(filter => (
                    <button
                        key={filter}
                        className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="itinerary-list">
                {filteredItineraries.map(itin => (
                    <div key={itin.id} className={`itinerary-card-wrapper ${expandedCardId === itin.id ? 'expanded' : ''}`}>
                        <div className="itinerary-card">
                            <div className="itin-image-wrapper">
                                <img src={itin.image} alt={itin.title} className="itin-image" />
                            </div>
                            <div className="itin-content">
                                <div className="itin-header">
                                    <div>
                                        <h3 className="itin-title">{itin.title}</h3>
                                        <div className="itin-date">
                                            <Calendar size={14} />
                                            <span>{itin.date}</span>
                                        </div>
                                        <div className="itin-meta-row">
                                            <div className="itin-meta-item">
                                                <MapPin size={14} />
                                                <span>{itin.meta.cities}</span>
                                            </div>
                                            {itin.meta.activities && (
                                                <div className="itin-meta-item">
                                                    <span>⁝≡ {itin.meta.activities}</span>
                                                </div>
                                            )}
                                            {itin.type === 'Business' && (
                                                <div className="itin-meta-item">
                                                    <Briefcase size={14} />
                                                    <span>Business</span>
                                                </div>
                                            )}
                                            {itin.type === 'Solo Trip' && (
                                                <div className="itin-meta-item">
                                                    <User size={14} />
                                                    <span>Solo Trip</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`status-badge ${itin.status.toLowerCase()}`}>{itin.status}</span>
                                </div>

                                <div className="itin-footer">
                                    {itin.status === 'Completed' ? (
                                        <>
                                            <button className="btn-link">Archive</button>
                                            <button className="btn-link primary">View Summary <ArrowRight size={14} /></button>
                                        </>
                                    ) : itin.status === 'Draft' ? (
                                        <div className="draft-actions">
                                            <button className="btn-link" onClick={() => handleExpandCard(itin.id)}>
                                                <Edit3 size={14} /> Continue Planning
                                            </button>
                                            <button className="btn-link bucket" onClick={() => handleAddToBucketList(itin.id)}>
                                                <Heart size={14} /> Add to Bucket List
                                            </button>
                                            <button className="btn-link primary" onClick={() => handleBookNow(itin)}>
                                                <CreditCard size={14} /> Book Now
                                            </button>
                                        </div>
                                    ) : itin.status === 'Bucket List' ? (
                                        <div className="draft-actions">
                                            <button className="btn-link" onClick={() => handleExpandCard(itin.id)}>
                                                <Edit3 size={14} /> View Details
                                            </button>
                                            <button className="btn-link primary" onClick={() => handleBookNow(itin)}>
                                                <CreditCard size={14} /> Book Now
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button className="btn-link">Edit Plan</button>
                                            <button className="btn-link primary" onClick={() => handleExpandCard(itin.id)}>
                                                View Details <ArrowRight size={14} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedCardId === itin.id && itin.days && itin.days.length > 0 && (
                                <ExpandedItineraryCard
                                    itinerary={itin}
                                    onCollapse={() => setExpandedCardId(null)}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {isBuilderOpen && (
                    <ItineraryBuilder
                        isOpen={isBuilderOpen}
                        onClose={() => setIsBuilderOpen(false)}
                        onComplete={handleBuilderComplete}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {bookingItinerary && (
                    <BookingSimulation
                        itinerary={bookingItinerary}
                        onComplete={handleBookingComplete}
                        onClose={() => setBookingItinerary(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ItineraryList;
