import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Hotel, Utensils, Car, Ticket, Check, Calendar, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import './BookingSimulation.css';

const BookingSimulation = ({ itinerary, onComplete, onClose }) => {
    const [phase, setPhase] = useState('booking'); // 'booking', 'confirmed', 'summary'
    const [bookingStep, setBookingStep] = useState(0);

    const bookingSteps = [
        { icon: <Plane size={24} />, text: 'Booking outbound flight...', emoji: '✈️', delay: 800 },
        { icon: <Hotel size={24} />, text: 'Reserving accommodation...', emoji: '🏨', delay: 700 },
        { icon: <Utensils size={24} />, text: 'Acquiring restaurant reservations...', emoji: '🍽️', delay: 600 },
        { icon: <Car size={24} />, text: 'Reserving car rental...', emoji: '🚗', delay: 700 },
        { icon: <Ticket size={24} />, text: 'Booking activities & tickets...', emoji: '🎟️', delay: 800 },
        { icon: <Plane size={24} />, text: 'Booking return flight...', emoji: '✈️', delay: 600 },
        { icon: <Check size={24} />, text: 'Finalizing your booking...', emoji: '✨', delay: 500 }
    ];

    // Mock booking details
    const bookingDetails = {
        flight: {
            outbound: { airline: 'United Airlines', flight: 'UA 847', departure: '8:45 AM', arrival: '2:30 PM', class: 'Economy' },
            return: { airline: 'United Airlines', flight: 'UA 848', departure: '11:00 AM', arrival: '5:15 PM', class: 'Economy' }
        },
        hotel: { name: 'Grand Hotel Central', checkIn: itinerary?.date?.split(' - ')[0] || 'TBD', nights: itinerary?.days?.length || 5, roomType: 'Deluxe Double' },
        carRental: { company: 'Hertz', vehicle: 'Toyota Corolla', pickup: 'Airport', dropoff: 'Airport' },
        restaurants: itinerary?.days?.slice(0, 3).map((day, i) => ({ name: `Restaurant ${i + 1}`, time: '7:00 PM', date: day.date })) || [],
        confirmationNumber: `TRV-${Date.now().toString(36).toUpperCase()}`
    };

    useEffect(() => {
        if (phase === 'booking' && bookingStep < bookingSteps.length) {
            const timer = setTimeout(() => {
                if (bookingStep === bookingSteps.length - 1) {
                    setTimeout(() => setPhase('confirmed'), 500);
                } else {
                    setBookingStep(prev => prev + 1);
                }
            }, bookingSteps[bookingStep].delay);
            return () => clearTimeout(timer);
        }
    }, [phase, bookingStep]);

    useEffect(() => {
        if (phase === 'confirmed') {
            const timer = setTimeout(() => setPhase('summary'), 2000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    const handleAddToPlanner = () => {
        onComplete(itinerary, bookingDetails);
    };

    return (
        <motion.div className="booking-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div 
                className="booking-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                <button className="close-booking-btn" onClick={onClose}><X size={20} /></button>

                {/* Phase 1: Booking Animation */}
                {phase === 'booking' && (
                    <div className="booking-phase booking-animation-phase">
                        <h2>Booking your trip...</h2>
                        <div className="booking-progress">
                            <div className="progress-bar" style={{ width: `${((bookingStep + 1) / bookingSteps.length) * 100}%` }}></div>
                        </div>
                        <div className="booking-steps-container">
                            {bookingSteps.map((step, index) => (
                                <AnimatePresence key={index}>
                                    {bookingStep >= index && (
                                        <motion.div
                                            className={`booking-step-item ${bookingStep === index ? 'active' : 'done'}`}
                                            initial={{ x: -30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <span className="step-emoji">{step.emoji}</span>
                                            <span className="step-text">{step.text}</span>
                                            {bookingStep > index && <Check size={16} className="step-check" />}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            ))}
                        </div>
                    </div>
                )}

                {/* Phase 2: Confirmation */}
                {phase === 'confirmed' && (
                    <motion.div 
                        className="booking-phase confirmation-phase"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                    >
                        <motion.div 
                            className="success-checkmark"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                        >
                            <Check size={64} />
                        </motion.div>
                        <h2>Your trip has been booked!</h2>
                        <p className="confirmation-number">Confirmation: {bookingDetails.confirmationNumber}</p>
                    </motion.div>
                )}

                {/* Phase 3: Summary - continued in next edit */}
                {phase === 'summary' && (
                    <div className="booking-phase summary-phase">
                        <h2>Booking Summary</h2>
                        <div className="summary-header">
                            <img src={itinerary?.image} alt={itinerary?.title} className="summary-image" />
                            <div className="summary-info">
                                <h3>{itinerary?.title}</h3>
                                <div className="summary-meta">
                                    <span><MapPin size={14} /> {itinerary?.destination || itinerary?.meta?.cities}</span>
                                    <span><Calendar size={14} /> {itinerary?.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="summary-sections">
                            <div className="summary-section">
                                <h4><Plane size={16} /> Flights</h4>
                                <p>{bookingDetails.flight.outbound.airline} {bookingDetails.flight.outbound.flight}</p>
                            </div>
                            <div className="summary-section">
                                <h4><Hotel size={16} /> Accommodation</h4>
                                <p>{bookingDetails.hotel.name} • {bookingDetails.hotel.nights} nights</p>
                            </div>
                            <div className="summary-section">
                                <h4><Car size={16} /> Car Rental</h4>
                                <p>{bookingDetails.carRental.company} • {bookingDetails.carRental.vehicle}</p>
                            </div>
                        </div>
                        <div className="summary-footer">
                            <p className="planner-note">✓ Added to your planner</p>
                            <button className="btn-primary" onClick={handleAddToPlanner}>
                                View in Planner <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default BookingSimulation;

