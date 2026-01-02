import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, GripVertical, Trash2, Cloud, CloudRain, Sun, CloudSnow } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './ExpandedItineraryCard.css';

const ExpandedItineraryCard = ({ itinerary, onCollapse }) => {
    const [days, setDays] = useState(itinerary.days || []);
    const [dayNotes, setDayNotes] = useState({});

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        // Moving within the same day
        if (source.droppableId === destination.droppableId) {
            const dayIndex = parseInt(source.droppableId.split('-')[1]);
            const newDays = [...days];
            const dayActivities = [...newDays[dayIndex].activities];
            const [removed] = dayActivities.splice(source.index, 1);
            dayActivities.splice(destination.index, 0, removed);
            newDays[dayIndex].activities = dayActivities;
            setDays(newDays);
        } else {
            // Moving between days
            const sourceDayIndex = parseInt(source.droppableId.split('-')[1]);
            const destDayIndex = parseInt(destination.droppableId.split('-')[1]);
            const newDays = [...days];
            const sourceActivities = [...newDays[sourceDayIndex].activities];
            const destActivities = [...newDays[destDayIndex].activities];
            const [removed] = sourceActivities.splice(source.index, 1);
            destActivities.splice(destination.index, 0, removed);
            newDays[sourceDayIndex].activities = sourceActivities;
            newDays[destDayIndex].activities = destActivities;
            setDays(newDays);
        }
    };

    const removeActivity = (dayIndex, activityIndex) => {
        const newDays = [...days];
        newDays[dayIndex].activities.splice(activityIndex, 1);
        setDays(newDays);
    };

    const addActivity = (dayIndex) => {
        const newDays = [...days];
        newDays[dayIndex].activities.push({
            id: `activity-${Date.now()}`,
            time: '12:00 PM',
            title: 'New Activity',
            location: 'Location',
            cost: '$0'
        });
        setDays(newDays);
    };

    const getWeatherIcon = (weather) => {
        switch (weather) {
            case 'sunny': return <Sun size={16} />;
            case 'cloudy': return <Cloud size={16} />;
            case 'rainy': return <CloudRain size={16} />;
            case 'snowy': return <CloudSnow size={16} />;
            default: return <Sun size={16} />;
        }
    };

    return (
        <motion.div
            className="expanded-itinerary-card"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <div className="expanded-header">
                <h3>Day-by-Day Itinerary</h3>
                <button className="close-expanded-btn" onClick={onCollapse}>
                    <X size={20} />
                </button>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="days-container">
                    {days.map((day, dayIndex) => (
                        <div key={day.id} className="day-section" style={{ backgroundImage: day.bgImage ? `url(${day.bgImage})` : 'none' }}>
                            <div className="day-overlay"></div>
                            <div className="day-content">
                                <div className="day-header">
                                    <h4>Day {dayIndex + 1} - {day.date}</h4>
                                    <div className="day-meta">
                                        <span className="day-weather">
                                            {getWeatherIcon(day.weather)} {day.temperature}
                                        </span>
                                        <span className="day-cost">{day.dailyCost}</span>
                                    </div>
                                </div>

                                <Droppable droppableId={`day-${dayIndex}`} type="ACTIVITY">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`activities-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                        >
                                            {day.activities.map((activity, activityIndex) => (
                                                <Draggable key={activity.id} draggableId={activity.id} index={activityIndex}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className={`activity-card ${snapshot.isDragging ? 'dragging' : ''}`}
                                                        >
                                                            <div {...provided.dragHandleProps} className="drag-handle">
                                                                <GripVertical size={16} />
                                                            </div>
                                                            <div className="activity-content">
                                                                <div className="activity-time">{activity.time}</div>
                                                                <div className="activity-details">
                                                                    <div className="activity-title">{activity.title}</div>
                                                                    <div className="activity-location">{activity.location}</div>
                                                                </div>
                                                                <div className="activity-cost">{activity.cost}</div>
                                                            </div>
                                                            <button
                                                                className="remove-activity-btn"
                                                                onClick={() => removeActivity(dayIndex, activityIndex)}
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>

                                <button className="add-event-btn" onClick={() => addActivity(dayIndex)}>
                                    <Plus size={16} /> Add Event
                                </button>

                                <textarea
                                    className="day-notes"
                                    placeholder="Add notes for this day..."
                                    value={dayNotes[day.id] || ''}
                                    onChange={(e) => setDayNotes({ ...dayNotes, [day.id]: e.target.value })}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </motion.div>
    );
};

export default ExpandedItineraryCard;

