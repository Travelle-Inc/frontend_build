import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Plane, Hotel, Calendar, MapPin, DollarSign, Check, Eye, Save, Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';
import LocationAutocomplete from '../Chat/LocationAutocomplete';
import DateRangePicker from '../Chat/DateRangePicker';
import TravelerSelector from '../Chat/TravelerSelector';
import './ItineraryBuilder.css';

const ItineraryBuilder = ({ isOpen, onClose, onComplete }) => {
    const [step, setStep] = useState(1);
    const [destination, setDestination] = useState('');
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [isTravelerSelectorOpen, setIsTravelerSelectorOpen] = useState(false);
    const [travelers, setTravelers] = useState({
        adults: 2,
        students: 0,
        seniors: 0,
        youths: 0,
        children: 0,
        toddlers: 0,
        infants: 0
    });
    const [cabinClass, setCabinClass] = useState('Economy');
    const [isBuilding, setIsBuilding] = useState(false);
    const [buildingStep, setBuildingStep] = useState(0);
    const [generatedItinerary, setGeneratedItinerary] = useState(null);
    const [isViewingDetails, setIsViewingDetails] = useState(false);

    // Refs for trigger elements (not dropdown wrappers)
    const dateInputRef = useRef(null);
    const travelerInputRef = useRef(null);

    // Weather icon helper
    const getWeatherIcon = (weather) => {
        switch (weather) {
            case 'sunny': return <Sun size={14} />;
            case 'cloudy': return <Cloud size={14} />;
            case 'rainy': return <CloudRain size={14} />;
            case 'snowy': return <CloudSnow size={14} />;
            default: return <Sun size={14} />;
        }
    };

    const getTotalTravelers = () => {
        return Object.values(travelers).reduce((a, b) => a + b, 0);
    };

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
            startBuildingAnimation();
        }
    };

    const handleBack = () => {
        if (step === 2 && !isBuilding) {
            setStep(1);
        }
    };

    const startBuildingAnimation = async () => {
        setIsBuilding(true);
        const steps = [
            'trip-title',
            'outbound-flight',
            'accommodation',
            'day-0',
            'day-1',
            'day-2',
            'day-3',
            'day-4',
            'return-flight',
            'summary',
            'complete'
        ];

        for (let i = 0; i < steps.length; i++) {
            setBuildingStep(i);
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Generate the itinerary data
        const itinerary = generateMockItinerary();
        setGeneratedItinerary(itinerary);
        setIsBuilding(false);
        setStep(3);
    };

    const generateMockItinerary = () => {
        // Extract destination name from object or use default
        const destName = destination?.name || destination || 'Paris, France';
        const startDate = dateRange.start || new Date();

        // Get destination-specific image
        const getDestinationImage = (dest) => {
            const destLower = dest.toLowerCase();
            if (destLower.includes('paris')) return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800';
            if (destLower.includes('tokyo')) return 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800';
            if (destLower.includes('rome')) return 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800';
            if (destLower.includes('london')) return 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800';
            if (destLower.includes('new york')) return 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800';
            if (destLower.includes('barcelona')) return 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800';
            if (destLower.includes('dubai')) return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800';
            if (destLower.includes('bali')) return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800';
            // Default travel image
            return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800';
        };

        // Calculate number of days
        const dayCount = dateRange.start && dateRange.end
            ? Math.ceil((dateRange.end - dateRange.start) / (1000 * 60 * 60 * 24)) + 1
            : 5;

        // Format date range for display
        const formatDateRange = () => {
            if (dateRange.start && dateRange.end) {
                const options = { month: 'short', day: 'numeric', year: 'numeric' };
                return `${dateRange.start.toLocaleDateString('en-US', options)} - ${dateRange.end.toLocaleDateString('en-US', options)}`;
            }
            return 'Flexible Dates • ' + dayCount + ' Days';
        };

        return {
            id: `itin-${Date.now()}`,
            title: `${destName} Adventure`,
            image: getDestinationImage(destName),
            date: formatDateRange(),
            destination: destName,
            dateRange: dateRange,
            travelers: getTotalTravelers(),
            status: 'Draft',
            meta: {
                cities: destName,
                activities: `${dayCount * 4} Activities`
            },
            type: getTotalTravelers() === 1 ? 'Solo Trip' : null,
            totalCost: '$3,240',
            days: [
                {
                    id: 'day-0',
                    date: formatDate(startDate, 0),
                    weather: 'sunny',
                    temperature: '72°F',
                    dailyCost: '$280',
                    bgImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
                    activities: [
                        { id: 'act-0-1', time: '10:00 AM', title: 'Departure Flight', location: 'JFK Airport', cost: '$450' },
                        { id: 'act-0-2', time: '11:30 PM', title: 'Arrival Flight', location: `${destName} Airport`, cost: 'Included' },
                        { id: 'act-0-3', time: '3:00 PM', title: 'Hotel Check-in', location: 'Grand Hotel Central', cost: '$180' },
                        { id: 'act-0-4', time: '7:00 PM', title: 'Welcome Dinner', location: 'Le Bistro', cost: '$65' }
                    ]
                },
                {
                    id: 'day-1',
                    date: formatDate(startDate, 1),
                    weather: 'sunny',
                    temperature: '75°F',
                    dailyCost: '$220',
                    bgImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
                    activities: [
                        { id: 'act-1-1', time: '8:00 AM', title: 'Breakfast', location: 'Café de Flore', cost: '$25' },
                        { id: 'act-1-2', time: '10:00 AM', title: 'City Walking Tour', location: 'Historic District', cost: '$45' },
                        { id: 'act-1-3', time: '12:30 PM', title: 'Lunch', location: 'Local Bistro', cost: '$35' },
                        { id: 'act-1-4', time: '1:00 PM', title: 'Museum Visit', location: 'National Museum', cost: '$30' },
                        { id: 'act-1-5', time: '3:00 PM', title: 'Afternoon Tea', location: 'Tea House', cost: '$20' },
                        { id: 'act-1-6', time: '7:00 PM', title: 'Dinner', location: 'Fine Dining Restaurant', cost: '$85' }
                    ]
                },
                {
                    id: 'day-2',
                    date: formatDate(startDate, 2),
                    weather: 'cloudy',
                    temperature: '68°F',
                    dailyCost: '$195',
                    bgImage: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
                    activities: [
                        { id: 'act-2-1', time: '8:00 AM', title: 'Breakfast', location: 'Hotel Restaurant', cost: '$20' },
                        { id: 'act-2-2', time: '10:00 AM', title: 'Landmark Visit', location: 'Famous Tower', cost: '$40' },
                        { id: 'act-2-3', time: '12:30 PM', title: 'Lunch', location: 'Riverside Café', cost: '$30' },
                        { id: 'act-2-4', time: '3:00 PM', title: 'Shopping District', location: 'Main Avenue', cost: '$50' },
                        { id: 'act-2-5', time: '7:00 PM', title: 'Traditional Dinner', location: 'Local Cuisine', cost: '$55' }
                    ]
                },
                {
                    id: 'day-3',
                    date: formatDate(startDate, 3),
                    weather: 'sunny',
                    temperature: '73°F',
                    dailyCost: '$185',
                    bgImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
                    activities: [
                        { id: 'act-3-1', time: '8:00 AM', title: 'Breakfast', location: 'Bakery Café', cost: '$18' },
                        { id: 'act-3-2', time: '10:00 AM', title: 'Day Trip', location: 'Nearby Town', cost: '$60' },
                        { id: 'act-3-3', time: '12:30 PM', title: 'Lunch', location: 'Countryside Restaurant', cost: '$40' },
                        { id: 'act-3-4', time: '3:00 PM', title: 'Scenic Views', location: 'Viewpoint', cost: '$15' },
                        { id: 'act-3-5', time: '7:00 PM', title: 'Farewell Dinner', location: 'Rooftop Restaurant', cost: '$75' }
                    ]
                },
                {
                    id: 'day-4',
                    date: formatDate(startDate, 4),
                    weather: 'sunny',
                    temperature: '70°F',
                    dailyCost: '$120',
                    bgImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
                    activities: [
                        { id: 'act-4-1', time: '11:00 AM', title: 'Hotel Check-out', location: 'Grand Hotel Central', cost: 'Included' },
                        { id: 'act-4-2', time: '12:00 PM', title: 'Last-minute Shopping', location: 'Souvenir Shop', cost: '$40' },
                        { id: 'act-4-3', time: '3:00 PM', title: 'Departure Flight', location: `${destName} Airport`, cost: '$450' }
                    ]
                }
            ]
        };
    };

    const formatDate = (baseDate, daysToAdd) => {
        const date = new Date(baseDate);
        date.setDate(date.getDate() + daysToAdd);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const handleSave = () => {
        if (onComplete && generatedItinerary) {
            onComplete(generatedItinerary);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <motion.div
            className="itinerary-builder-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="itinerary-builder-modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
            >
                {/* Step 1: Basic Information */}
                {step === 1 && (
                    <div className="builder-step">
                        <div className="builder-header">
                            <h2>Create New Itinerary</h2>
                            <button className="close-builder-btn" onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="builder-content">
                            <div className="form-group">
                                <label>Where are you going?</label>
                                <LocationAutocomplete
                                    placeholder="Enter destination"
                                    onSelect={(loc) => setDestination(loc)}
                                />
                            </div>

                            <div className="form-group">
                                <label>When?</label>
                                <div
                                    ref={dateInputRef}
                                    className="date-input-wrapper"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsDatePickerOpen(!isDatePickerOpen);
                                    }}
                                >
                                    <Calendar size={18} />
                                    <span>
                                        {dateRange.start && dateRange.end
                                            ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
                                            : 'Select dates'}
                                    </span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Who's traveling?</label>
                                <div
                                    ref={travelerInputRef}
                                    className="traveler-input-wrapper"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsTravelerSelectorOpen(!isTravelerSelectorOpen);
                                    }}
                                >
                                    <span>{getTotalTravelers()} Traveler{getTotalTravelers() !== 1 ? 's' : ''}, {cabinClass}</span>
                                </div>
                            </div>
                        </div>

                        <div className="builder-footer">
                            <button className="btn-secondary" onClick={onClose}>Cancel</button>
                            <button
                                className="btn-primary"
                                onClick={handleNext}
                                disabled={!destination || !dateRange.start || !dateRange.end}
                            >
                                Generate Itinerary <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Building Animation */}
                {step === 2 && (
                    <div className="builder-step building-step">
                        <div className="building-animation">
                            <h2>Building your perfect itinerary...</h2>
                            <div className="progress-indicator">
                                <div className="progress-bar" style={{ width: `${(buildingStep / 10) * 100}%` }}></div>
                            </div>
                            <AnimatedBuildingSequence step={buildingStep} destination={destination} />
                        </div>
                    </div>
                )}

                {/* Step 3: Completion */}
                {step === 3 && generatedItinerary && !isViewingDetails && (
                    <div className="builder-step completion-step">
                        <div className="builder-header">
                            <div className="success-icon">
                                <Check size={32} />
                            </div>
                            <h2>Your itinerary is ready!</h2>
                        </div>

                        <div className="itinerary-preview">
                            <div className="preview-image-wrapper">
                                <img src={generatedItinerary.image} alt={generatedItinerary.title} className="preview-image" />
                            </div>
                            <h3>{generatedItinerary.title}</h3>
                            <div className="preview-meta">
                                <span><MapPin size={16} /> {generatedItinerary.destination}</span>
                                <span><Calendar size={16} /> {generatedItinerary.date}</span>
                                <span><DollarSign size={16} /> {generatedItinerary.totalCost}</span>
                            </div>
                            <div className="preview-summary">
                                <p>✓ {generatedItinerary.days.length} days of activities planned</p>
                                <p>✓ {generatedItinerary.days.reduce((sum, day) => sum + day.activities.length, 0)} activities included</p>
                                <p>✓ Flights, accommodation, and daily itinerary</p>
                            </div>
                        </div>

                        <div className="builder-footer three-buttons">
                            <button className="btn-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn-outline" onClick={() => setIsViewingDetails(true)}>
                                <Eye size={18} /> View Details
                            </button>
                            <button className="btn-primary" onClick={handleSave}>
                                <Save size={18} /> Save Itinerary
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3b: Detailed View */}
                {step === 3 && generatedItinerary && isViewingDetails && (
                    <div className="builder-step details-step">
                        <div className="details-header">
                            <button className="back-btn" onClick={() => setIsViewingDetails(false)}>
                                <ArrowLeft size={20} /> Back
                            </button>
                            <h2>{generatedItinerary.title}</h2>
                        </div>

                        <div className="details-content">
                            <div className="details-overview">
                                <img src={generatedItinerary.image} alt={generatedItinerary.title} className="details-hero-image" />
                                <div className="details-info">
                                    <div className="info-item">
                                        <MapPin size={16} />
                                        <span>{generatedItinerary.destination}</span>
                                    </div>
                                    <div className="info-item">
                                        <Calendar size={16} />
                                        <span>{generatedItinerary.date}</span>
                                    </div>
                                    <div className="info-item">
                                        <DollarSign size={16} />
                                        <span>{generatedItinerary.totalCost}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="details-days">
                                {generatedItinerary.days.map((day, dayIndex) => (
                                    <div key={day.id} className="details-day-card">
                                        <div className="day-card-header">
                                            <h4>Day {dayIndex + 1} - {day.date}</h4>
                                            <div className="day-card-meta">
                                                <span className="weather-badge">
                                                    {getWeatherIcon(day.weather)} {day.temperature}
                                                </span>
                                                <span className="cost-badge">{day.dailyCost}</span>
                                            </div>
                                        </div>
                                        <div className="day-activities-compact">
                                            {day.activities.map((activity) => (
                                                <div key={activity.id} className="activity-row">
                                                    <span className="activity-time">{activity.time}</span>
                                                    <span className="activity-title">{activity.title}</span>
                                                    <span className="activity-cost">{activity.cost}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="builder-footer two-buttons">
                            <button className="btn-secondary" onClick={onClose}>Cancel</button>
                            <button className="btn-primary" onClick={handleSave}>
                                <Save size={18} /> Save & Edit
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Portal-rendered dropdowns */}
            {isDatePickerOpen && ReactDOM.createPortal(
                <DateRangePicker
                    triggerRef={dateInputRef}
                    inModal={true}
                    onClose={() => setIsDatePickerOpen(false)}
                    onSelect={(start, end) => {
                        setDateRange({ start, end });
                        setIsDatePickerOpen(false);
                    }}
                />,
                document.body
            )}

            {isTravelerSelectorOpen && ReactDOM.createPortal(
                <TravelerSelector
                    triggerRef={travelerInputRef}
                    inModal={true}
                    isOpen={isTravelerSelectorOpen}
                    onClose={() => setIsTravelerSelectorOpen(false)}
                    travelers={travelers}
                    onTravelerChange={setTravelers}
                    cabinClass={cabinClass}
                    onCabinChange={setCabinClass}
                />,
                document.body
            )}
        </motion.div>
    );
};

// Animated Building Sequence Component
const AnimatedBuildingSequence = ({ step, destination }) => {
    // Extract destination name from object or use as string
    const destName = destination?.name || destination || 'your destination';

    const buildingSteps = [
        { icon: <MapPin size={24} />, text: `Planning trip to ${destName}`, color: '#007bff' },
        { icon: <Plane size={24} />, text: 'Finding best flights', color: '#10b981' },
        { icon: <Hotel size={24} />, text: 'Selecting accommodations', color: '#f59e0b' },
        { icon: <Calendar size={24} />, text: 'Creating Day 1 itinerary', color: '#8b5cf6' },
        { icon: <Calendar size={24} />, text: 'Creating Day 2 itinerary', color: '#8b5cf6' },
        { icon: <Calendar size={24} />, text: 'Creating Day 3 itinerary', color: '#8b5cf6' },
        { icon: <Calendar size={24} />, text: 'Creating Day 4 itinerary', color: '#8b5cf6' },
        { icon: <Calendar size={24} />, text: 'Creating Day 5 itinerary', color: '#8b5cf6' },
        { icon: <Plane size={24} />, text: 'Booking return flight', color: '#10b981' },
        { icon: <DollarSign size={24} />, text: 'Calculating costs', color: '#ef4444' },
        { icon: <Check size={24} />, text: 'Finalizing itinerary', color: '#22c55e' }
    ];

    return (
        <div className="building-steps">
            {buildingSteps.map((item, index) => (
                <AnimatePresence key={index}>
                    {step >= index && (
                        <motion.div
                            className="building-step-item"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            <div className="step-icon" style={{ color: item.color }}>
                                {item.icon}
                            </div>
                            <span>{item.text}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            ))}
        </div>
    );
};

export default ItineraryBuilder;

