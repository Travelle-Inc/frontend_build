import React from 'react';
import { CalendarDays, CheckSquare, FileText, Pin, Plus } from 'lucide-react';
import './PlannerSecondarySidebar.css';

const PlannerSecondarySidebar = ({ trips, activeTrip, onTripSelect, onTogglePin }) => {
    const pinnedTrips = trips.filter(t => t.isPinned);
    const unpinnedTrips = trips.filter(t => !t.isPinned);

    return (
        <aside className="planner-secondary-sidebar">
            <div className="planner-sec-nav">
                <div className="planner-nav-item">
                    <CalendarDays size={18} />
                    <span>My Day</span>
                </div>
                <div className="planner-nav-item">
                    <CheckSquare size={18} />
                    <span>My Tasks</span>
                </div>
                <div className="planner-nav-item active">
                    <FileText size={18} />
                    <span>My Plans</span>
                </div>
            </div>

            {pinnedTrips.length > 0 && (
                <div className="pinned-section">
                    <div className="pinned-header">PINNED</div>
                    {pinnedTrips.map(trip => (
                        <div
                            key={trip.id}
                            className={`pinned-trip ${trip.id === activeTrip ? 'active' : ''}`}
                            onClick={() => onTripSelect(trip.id)}
                        >
                            <Pin size={14} />
                            <span>{trip.name}</span>
                            <button
                                className="unpin-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTogglePin(trip.id);
                                }}
                                title="Unpin"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {unpinnedTrips.length > 0 && (
                <div className="pinned-section">
                    <div className="pinned-header">UNPINNED</div>
                    {unpinnedTrips.map(trip => (
                        <div
                            key={trip.id}
                            className={`pinned-trip unpinned ${trip.id === activeTrip ? 'active' : ''}`}
                            onClick={() => onTripSelect(trip.id)}
                        >
                            <FileText size={14} />
                            <span>{trip.name}</span>
                            <button
                                className="pin-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTogglePin(trip.id);
                                }}
                                title="Pin to sidebar"
                            >
                                <Pin size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button className="new-plan-btn">
                <Plus size={16} />
                <span>New plan</span>
            </button>
        </aside>
    );
};

export default PlannerSecondarySidebar;
