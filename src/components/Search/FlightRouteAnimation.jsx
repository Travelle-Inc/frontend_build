import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './FlightRouteAnimation.css';

const FlightRouteAnimation = ({ origin, destination, layovers = [] }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Calculate positions for origin, destination, and layovers
    const originX = 20;
    const destX = 280;
    const centerY = 40;

    // Create smooth curved path
    const createPath = () => {
        const points = [
            { x: originX, y: centerY },
            ...layovers.map((_, i) => ({
                x: originX + (destX - originX) * ((i + 1) / (layovers.length + 1)),
                y: centerY - 20 // Arc upward
            })),
            { x: destX, y: centerY }
        ];

        // Create smooth quadratic curve
        let path = `M ${originX} ${centerY}`;

        if (layovers.length === 0) {
            // Simple arc from origin to destination
            const controlY = centerY - 25;
            const midX = (originX + destX) / 2;
            path += ` Q ${midX} ${controlY} ${destX} ${centerY}`;
        } else {
            // Complex path with layovers
            points.forEach((point, i) => {
                if (i > 0) {
                    const prevPoint = points[i - 1];
                    const midX = (prevPoint.x + point.x) / 2;
                    const controlY = Math.min(prevPoint.y, point.y) - 15;
                    path += ` Q ${midX} ${controlY} ${point.x} ${point.y}`;
                }
            });
        }

        return path;
    };

    const pathData = createPath();

    return (
        <div className="flight-route-container">
            <svg width="300" height="80" viewBox="0 0 300 80">
                <defs>
                    {/* Gradient for path */}
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                    </linearGradient>

                    {/* Dashed pattern */}
                    <pattern id="dashPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="1" fill="#3b82f6" opacity="0.4" />
                    </pattern>
                </defs>

                {/* Background dashed guide line */}
                <motion.path
                    d={pathData}
                    stroke="url(#dashPattern)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />

                {/* Main animated path */}
                <motion.path
                    d={pathData}
                    stroke="url(#pathGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isVisible ? 1 : 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Origin Pin */}
                <motion.g
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4, type: "spring", stiffness: 200 }}
                >
                    <circle cx={originX} cy={centerY} r="4" fill="#10b981" />
                    <circle cx={originX} cy={centerY} r="8" fill="#10b981" fillOpacity="0.2" />
                    <motion.circle
                        cx={originX}
                        cy={centerY}
                        r="12"
                        fill="#10b981"
                        fillOpacity="0.1"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 0] }}
                        transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                </motion.g>

                {/* Layover Pins */}
                {layovers.map((layover, i) => {
                    const x = originX + (destX - originX) * ((i + 1) / (layovers.length + 1));
                    const y = centerY - 20;

                    return (
                        <motion.g
                            key={i}
                            initial={{ y: -15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 + i * 0.2, duration: 0.5, type: "spring", stiffness: 150 }}
                        >
                            <circle cx={x} cy={y} r="3" fill="#f59e0b" />
                            <circle cx={x} cy={y} r="6" fill="#f59e0b" fillOpacity="0.3" />
                            <text
                                x={x}
                                y={y - 12}
                                fontSize="8"
                                fill="#64748b"
                                textAnchor="middle"
                                fontWeight="600"
                            >
                                {layover.duration}
                            </text>
                        </motion.g>
                    );
                })}

                {/* Destination Pin */}
                <motion.g
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.4, type: "spring", stiffness: 200 }}
                >
                    <circle cx={destX} cy={centerY} r="4" fill="#3b82f6" />
                    <circle cx={destX} cy={centerY} r="8" fill="#3b82f6" fillOpacity="0.2" />
                    <motion.circle
                        cx={destX}
                        cy={centerY}
                        r="12"
                        fill="#3b82f6"
                        fillOpacity="0.1"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 0] }}
                        transition={{ delay: 1.4, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                </motion.g>

                {/* Airplane Icon (flies along path) */}
                <motion.g
                    initial={{ offsetDistance: "0%", opacity: 0 }}
                    animate={{
                        offsetDistance: isVisible ? "100%" : "0%",
                        opacity: [0, 1, 1, 0.7]
                    }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                    style={{ offsetPath: `path("${pathData}")`, offsetRotate: "auto" }}
                >
                    <path
                        d="M 0,-3 L 4,0 L 0,3 L 0,1 L -8,1 L -8,-1 L 0,-1 Z"
                        fill="#3b82f6"
                        transform="scale(1.2)"
                    />
                    <motion.circle
                        r="8"
                        fill="#3b82f6"
                        fillOpacity="0.15"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </motion.g>

                {/* Location Labels */}
                <text x={originX} y={centerY + 20} fontSize="9" fill="#64748b" textAnchor="middle" fontWeight="500">
                    {origin}
                </text>
                <text x={destX} y={centerY + 20} fontSize="9" fill="#64748b" textAnchor="middle" fontWeight="500">
                    {destination}
                </text>
            </svg>
        </div>
    );
};

export default FlightRouteAnimation;
