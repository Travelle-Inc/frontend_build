import React from 'react';
import { Plus, X, Folder } from 'lucide-react';
import './AddToTripModal.css';

const AddToTripModal = ({ isOpen, onClose, trips, onSelectTrip, onCreateNewTrip }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Add to Planner</h3>
                    <button className="close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="modal-body">
                    <p className="modal-subtitle">Select a trip to add this item to:</p>

                    <button className="create-trip-option" onClick={onCreateNewTrip}>
                        <div className="icon-box">
                            <Plus size={18} />
                        </div>
                        <span>Create New Trip</span>
                    </button>

                    <div className="trips-list">
                        {trips.map(trip => (
                            <button key={trip.id} className="trip-option" onClick={() => onSelectTrip(trip.id)}>
                                <Folder size={18} />
                                <span className="trip-name">{trip.name}</span>
                                <span className="item-count">{trip.sections.length} sections</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddToTripModal;
