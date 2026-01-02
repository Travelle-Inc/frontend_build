import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, CreditCard, Shield } from 'lucide-react';
import './SeatMapModal.css';

const SeatMapModal = ({ isOpen, onClose, flightInfo }) => {
    const [selectedSeat, setSelectedSeat] = useState(null);

    // Seat configuration: 6 seats per row (A-F), 20 rows
    const rows = 20;
    const columns = ['A', 'B', 'C', 'D', 'E', 'F'];

    // Mock seat status data
    const getSeatStatus = (row, col) => {
        const seatNum = `${row}${col}`;

        // First 3 rows: Business class
        if (row <= 3) return 'business';

        // Random occupied seats
        if (Math.random() > 0.6) return 'occupied';

        // Premium economy (rows 4-8)
        if (row <= 8 && ['A', 'F'].includes(col)) return 'premium';

        return 'available';
    };

    const getSeatPrice = (status) => {
        switch (status) {
            case 'business': return '+$299';
            case 'premium': return '+$99';
            default: return 'Included';
        }
    };

    const handleSeatClick = (row, col, status) => {
        if (status === 'occupied') return;
        const seatNum = `${row}${col}`;
        setSelectedSeat(selectedSeat === seatNum ? null : seatNum);
    };

    const getSeatClass = (row, col, status) => {
        const seatNum = `${row}${col}`;
        let classes = ['seat', status];
        if (selectedSeat === seatNum) classes.push('selected');
        return classes.join(' ');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="seat-map-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="seat-map-modal"
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="seat-map-header">
                            <div className="header-content">
                                <h2>Select Your Seat</h2>
                                <p className="flight-route">
                                    {flightInfo?.origin || 'JFK'} → {flightInfo?.destination || 'FCO'}
                                </p>
                            </div>
                            <button className="close-button" onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>

                        {/* Legend */}
                        <div className="seat-legend">
                            <div className="legend-item">
                                <div className="legend-seat available"></div>
                                <span>Available</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-seat premium"></div>
                                <span>Premium (+$99)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-seat business"></div>
                                <span>Business (+$299)</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-seat occupied"></div>
                                <span>Occupied</span>
                            </div>
                            <div className="legend-item">
                                <div className="legend-seat selected"></div>
                                <span>Your Selection</span>
                            </div>
                        </div>

                        {/* Aircraft Visualization */}
                        <div className="aircraft-container">
                            {/* Cockpit */}
                            <div className="aircraft-cockpit">
                                <div className="cockpit-shape"></div>
                            </div>

                            {/* Seat Grid */}
                            <div className="seats-grid">
                                {/* Column Headers */}
                                <div className="column-headers">
                                    <div className="header-group">
                                        <span>A</span>
                                        <span>B</span>
                                        <span>C</span>
                                    </div>
                                    <div className="aisle"></div>
                                    <div className="header-group">
                                        <span>D</span>
                                        <span>E</span>
                                        <span>F</span>
                                    </div>
                                </div>

                                {Array.from({ length: rows }, (_, rowIndex) => {
                                    const rowNum = rowIndex + 1;
                                    return (
                                        <div key={rowNum} className="seat-row">
                                            <span className="row-number">{rowNum}</span>

                                            <div className="seat-group">
                                                {columns.slice(0, 3).map(col => {
                                                    const status = getSeatStatus(rowNum, col);
                                                    return (
                                                        <motion.div
                                                            key={col}
                                                            className={getSeatClass(rowNum, col, status)}
                                                            whileHover={status !== 'occupied' ? { scale: 1.1 } : {}}
                                                            whileTap={status !== 'occupied' ? { scale: 0.95 } : {}}
                                                            onClick={() => handleSeatClick(rowNum, col, status)}
                                                            title={`Seat ${rowNum}${col} - ${getSeatPrice(status)}`}
                                                        >
                                                            <span className="seat-label">{col}</span>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>

                                            <div className="aisle"></div>

                                            <div className="seat-group">
                                                {columns.slice(3, 6).map(col => {
                                                    const status = getSeatStatus(rowNum, col);
                                                    return (
                                                        <motion.div
                                                            key={col}
                                                            className={getSeatClass(rowNum, col, status)}
                                                            whileHover={status !== 'occupied' ? { scale: 1.1 } : {}}
                                                            whileTap={status !== 'occupied' ? { scale: 0.95 } : {}}
                                                            onClick={() => handleSeatClick(rowNum, col, status)}
                                                            title={`Seat ${rowNum}${col} - ${getSeatPrice(status)}`}
                                                        >
                                                            <span className="seat-label">{col}</span>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>

                                            <span className="row-number">{rowNum}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Wing markers */}
                            <div className="wing-marker left-wing">
                                <div className="wing-shape"></div>
                            </div>
                            <div className="wing-marker right-wing">
                                <div className="wing-shape"></div>
                            </div>
                        </div>

                        {/* Footer with Selection */}
                        <div className="seat-map-footer">
                            {selectedSeat ? (
                                <div className="selection-info">
                                    <div className="selected-seat-display">
                                        <Users size={20} />
                                        <span>Seat {selectedSeat} selected</span>
                                    </div>
                                    <button className="confirm-button">
                                        Confirm Selection
                                    </button>
                                </div>
                            ) : (
                                <p className="no-selection">Select a seat to continue</p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SeatMapModal;
