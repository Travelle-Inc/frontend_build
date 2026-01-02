import React, { useRef, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import useSmartDropdownPosition from '../../hooks/useSmartDropdownPosition';
import './TravelerSelector.css';

const TravelerSelector = ({
    isOpen,
    onClose,
    travelers,
    onTravelerChange,
    cabinClass,
    onCabinChange,
    triggerRef = null,
    inModal = false
}) => {
    const popupRef = useRef(null);

    // Get smart positioning if triggerRef is provided
    const { style: positionStyle, placement } = useSmartDropdownPosition(
        triggerRef,
        popupRef,
        isOpen,
        { offset: 8, chatBarClearance: 96 }
    );

    // Close on click outside (handles portal rendering)
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is inside the dropdown
            if (popupRef.current && popupRef.current.contains(event.target)) {
                return; // Click inside dropdown, don't close
            }

            // Check if click is on the trigger element
            if (triggerRef?.current && triggerRef.current.contains(event.target)) {
                return; // Click on trigger, don't close (let trigger handle toggle)
            }

            // Click is outside both dropdown and trigger, close it
            onClose();
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, triggerRef]);

    if (!isOpen) return null;

    const travelerTypes = [
        { id: 'adults', label: 'Adults', sub: '18-64' },
        { id: 'students', label: 'Students', sub: 'over 18' },
        { id: 'seniors', label: 'Seniors', sub: 'over 65' },
        { id: 'youths', label: 'Youths', sub: '12-17' },
        { id: 'children', label: 'Children', sub: '2-11' },
        { id: 'toddlers', label: 'Toddlers in own seat', sub: 'under 2' },
        { id: 'infants', label: 'Infants on lap', sub: 'under 2' },
    ];

    const cabinClasses = [
        'Economy', 'Premium Economy', 'Business', 'First'
    ];

    const handleIncrement = (type) => {
        onTravelerChange({
            ...travelers,
            [type]: (travelers[type] || 0) + 1
        });
    };

    const handleDecrement = (type) => {
        if ((travelers[type] || 0) > 0) {
            onTravelerChange({
                ...travelers,
                [type]: travelers[type] - 1
            });
        }
    };

    // Determine className based on props
    const placementClass = placement === 'center' ? 'placement-center' : (placement === 'top' ? 'placement-top' : 'placement-bottom');
    const popupClassName = `traveler-selector-popup ${inModal ? 'in-modal' : ''} ${placementClass}`;

    // Use positioning style if triggerRef provided, otherwise use default CSS positioning
    const popupStyle = triggerRef ? positionStyle : {};

    return (
        <div
            ref={popupRef}
            className={popupClassName}
            style={popupStyle}
        >
            <div className="selector-header">Travelers</div>

            <div className="selector-grid">
                {travelerTypes.map(type => (
                    <div key={type.id} className="traveler-row">
                        <div className="traveler-info">
                            <span className="traveler-type">{type.label}</span>
                            <span className="traveler-age">{type.sub}</span>
                        </div>
                        <div className="counter-controls">
                            <button
                                className="counter-btn"
                                onClick={() => handleDecrement(type.id)}
                                disabled={(travelers[type.id] || 0) === 0}
                            >
                                <Minus size={14} />
                            </button>
                            <span className="counter-value">{travelers[type.id] || 0}</span>
                            <button
                                className="counter-btn"
                                onClick={() => handleIncrement(type.id)}
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cabin-class-section">
                <div className="selector-header">Cabin Class</div>
                <div className="cabin-grid">
                    {cabinClasses.map(cls => (
                        <button
                            key={cls}
                            className={`cabin-btn ${cabinClass === cls ? 'active' : ''}`}
                            onClick={() => onCabinChange(cls)}
                        >
                            {cls}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TravelerSelector;
