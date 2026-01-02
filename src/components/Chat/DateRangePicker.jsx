import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import useSmartDropdownPosition from '../../hooks/useSmartDropdownPosition';
import './DateRangePicker.css';

const DateRangePicker = ({ onClose, onSelect, triggerRef = null, inModal = false }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [hoverDate, setHoverDate] = useState(null);
    const dropdownRef = useRef(null);

    // Get smart positioning if triggerRef is provided
    const { style: positionStyle, placement } = useSmartDropdownPosition(
        triggerRef,
        dropdownRef,
        true, // isOpen (component only renders when open)
        { offset: 8, chatBarClearance: 96 }
    );

    // Close on click outside (handles portal rendering)
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is inside the dropdown
            if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
                return; // Click inside dropdown, don't close
            }

            // Check if click is on the trigger element
            if (triggerRef?.current && triggerRef.current.contains(event.target)) {
                return; // Click on trigger, don't close (let trigger handle toggle)
            }

            // Click is outside both dropdown and trigger, close it
            onClose();
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose, triggerRef]);

    // Helpers
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

        if (!startDate || (startDate && endDate)) {
            setStartDate(clickedDate);
            setEndDate(null);
        } else {
            // Check if clicked date is before start date
            if (clickedDate < startDate) {
                setStartDate(clickedDate);
            } else {
                setEndDate(clickedDate);
                // Don't auto-close - let user see their selection and click Apply or close manually
                // Removed auto-close behavior to allow users to review their selection
            }
        }
    };

    const isSameDay = (d1, d2) => {
        return d1 && d2 && d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
    };

    const renderCalendar = () => {
        const uniqueId = currentDate.toISOString(); // Force re-render for animation when month changes
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isStart = isSameDay(date, startDate);
            const isEnd = isSameDay(date, endDate);

            // Check range (inclusive of hover for preview)
            const activeEnd = endDate || hoverDate;
            const isInRange = startDate && activeEnd && date > startDate && date < activeEnd;

            // For the background bar:
            // It should appear on Start (right half), End (left half), and Middle (full).
            // But simplifying: just fill the cell if it is part of the range interval [Start, End].
            const isCovered = startDate && activeEnd && date >= startDate && date <= activeEnd;

            // Determine styling for the background edges
            const isRangeStart = isSameDay(date, startDate);
            const isRangeEnd = isSameDay(date, activeEnd);

            days.push(
                <div
                    key={i}
                    className="calendar-day-wrapper"
                    onMouseEnter={() => !endDate && setHoverDate(date)}
                    onClick={() => handleDateClick(i)}
                >
                    {/* Background selection layer for Range */}
                    {isCovered && (
                        <motion.div
                            className={`range-bg ${isRangeStart ? 'range-start' : ''} ${isRangeEnd ? 'range-end' : ''}`}
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ originX: 0 }} // Wipe from left to right
                        />
                    )}

                    {/* Circle selection layer - Only for actual Start/End selection points (not hover end) */}
                    {(isStart) && (
                        <motion.div
                            className="selection-circle start"
                            layoutId="selection-circle-start"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                    {(isEnd) && (
                        <motion.div
                            className="selection-circle end"
                            layoutId="selection-circle-end"
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}

                    <span className={`day-number ${isStart || isEnd ? 'selected-text' : ''} ${isInRange ? 'in-range-text' : ''}`}>
                        {i}
                    </span>
                </div>
            );
        }

        return days;
    };

    // Determine className based on props
    const placementClass = placement === 'center' ? 'placement-center' : (placement === 'top' ? 'placement-top' : 'placement-bottom');
    const overlayClassName = `date-picker-overlay ${inModal ? 'in-modal' : ''} ${placementClass}`;

    // Use positioning style if triggerRef provided, otherwise use default CSS positioning
    const overlayStyle = triggerRef ? positionStyle : {};

    return (
        <motion.div
            ref={dropdownRef}
            className={overlayClassName}
            style={overlayStyle}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            <div className="date-picker-card">
                <div className="date-picker-header">
                    <button onClick={handlePrevMonth} className="nav-btn"><ChevronLeft size={20} /></button>
                    <span className="month-year-label">
                        {currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <button onClick={handleNextMonth} className="nav-btn"><ChevronRight size={20} /></button>
                    <button onClick={onClose} className="close-btn"><X size={18} /></button>
                </div>

                <div className="days-header">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>

                <div className="calendar-grid">
                    {renderCalendar()}
                </div>

                <div className="date-picker-footer">
                    <div className="selection-info">
                        {startDate ? startDate.toLocaleDateString() : 'Select check-in'}
                        {' - '}
                        {endDate ? endDate.toLocaleDateString() : 'Select check-out'}
                    </div>
                    {startDate && endDate && (
                        <button className="apply-btn" onClick={() => {
                            onSelect(startDate, endDate);
                            onClose(); // Close the dropdown after applying
                        }}>
                            Apply Dates
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default DateRangePicker;
