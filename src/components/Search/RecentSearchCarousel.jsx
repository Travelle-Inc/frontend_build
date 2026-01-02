import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import { Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import './RecentSearchCarousel.css';

const RecentSearchCarousel = ({ searchType, onSearchSelect }) => {
    const [recentSearches, setRecentSearches] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const isDraggingRef = useRef(false);
    const dragStartPos = useRef(0);
    const pointerStartX = useRef(0);
    const pointerStartY = useRef(0); // Track Y coordinate as well
    const lastDragEndTime = useRef(0);
    const autoPlayIntervalRef = useRef(null);
    const isAutoPlayPausedRef = useRef(false);
    const x = useMotionValue(0);
    const controls = useAnimation();
    const containerRef = useRef(null);
    const ITEM_WIDTH = 268; // Width of each item (256px) + gap (12px)
    const DRAG_THRESHOLD = 5; // Reduced threshold for better drag detection (accounts for hand tremor)
    const CLICK_DELAY = 200; // Increased delay after drag ends before allowing clicks
    const AUTO_PLAY_SPEED = 0.3; // Pixels per frame for smooth scrolling (30fps = ~15px/sec)
    const AUTO_PLAY_PAUSE_DURATION = 5000; // 5 seconds pause after manual interaction

    // City/destination images
    const destinationImages = {
        'New York': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=120&h=80&fit=crop',
        'London': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=120&h=80&fit=crop',
        'Paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=120&h=80&fit=crop',
        'Tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120&h=80&fit=crop',
        'Rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=120&h=80&fit=crop',
        'Los Angeles': 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=120&h=80&fit=crop',
        'Default': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=120&h=80&fit=crop'
    };

    useEffect(() => {
        // Load searches based on type
        const storageKey = searchType === 'Flights' ? 'recentFlightSearches' :
            searchType === 'Stays' ? 'recentHotelSearches' :
                `recent${searchType}Searches`;
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
        x.set(0); // Reset position when search type changes
    }, [searchType]);

    const getImage = (destination) => {
        const city = destination?.split(',')[0]?.trim();
        return destinationImages[city] || destinationImages['Default'];
    };

    // Create infinite loop by tripling the items
    const infiniteItems = recentSearches.length > 0
        ? [...recentSearches, ...recentSearches, ...recentSearches]
        : [];

    const totalWidth = recentSearches.length * ITEM_WIDTH;

    // Auto-play functionality with smooth continuous scrolling
    const startAutoPlay = () => {
        if (recentSearches.length <= 1) return;

        // Clear any existing animation frame
        if (autoPlayIntervalRef.current) {
            cancelAnimationFrame(autoPlayIntervalRef.current);
        }

        const animate = () => {
            if (!isHovered && !isDraggingRef.current && !isAutoPlayPausedRef.current) {
                const currentX = x.get();
                // Smoothly decrement x position for continuous scrolling
                x.set(currentX - AUTO_PLAY_SPEED);
            }
            autoPlayIntervalRef.current = requestAnimationFrame(animate);
        };

        autoPlayIntervalRef.current = requestAnimationFrame(animate);
    };

    const stopAutoPlay = () => {
        if (autoPlayIntervalRef.current) {
            cancelAnimationFrame(autoPlayIntervalRef.current);
            autoPlayIntervalRef.current = null;
        }
    };

    const pauseAutoPlayTemporarily = () => {
        isAutoPlayPausedRef.current = true;
        setTimeout(() => {
            isAutoPlayPausedRef.current = false;
        }, AUTO_PLAY_PAUSE_DURATION);
    };

    // Handle drag start
    const handleDragStart = (event, info) => {
        dragStartPos.current = info.point.x;
        isDraggingRef.current = false;
        pauseAutoPlayTemporarily(); // Pause auto-play during drag
    };

    // Handle infinite scroll wrapping
    const handleDragEnd = (event, info) => {
        const currentX = x.get();
        const velocity = info.velocity.x;
        const dragDistance = Math.abs(info.point.x - dragStartPos.current);

        // Mark as dragging if moved beyond threshold
        if (dragDistance > DRAG_THRESHOLD) {
            isDraggingRef.current = true;
            lastDragEndTime.current = Date.now();

            // Allow clicks again after short delay
            setTimeout(() => {
                isDraggingRef.current = false;
            }, CLICK_DELAY);
        }

        // Calculate momentum-based target position
        const momentumDistance = velocity * 0.3; // Adjust multiplier for more/less spin
        let targetX = currentX + momentumDistance;

        // Animate to target with momentum
        controls.start({
            x: targetX,
            transition: {
                type: 'spring',
                damping: 40,
                stiffness: 300,
                mass: 1.2,
                velocity: velocity / 10
            }
        });
    };

    // Button navigation with smooth animation
    const navigate = (direction) => {
        pauseAutoPlayTemporarily(); // Pause auto-play when using navigation buttons

        const currentX = x.get();
        const targetX = currentX + (direction * ITEM_WIDTH);

        controls.start({
            x: targetX,
            transition: {
                type: 'spring',
                damping: 50,
                stiffness: 400,
                mass: 0.8
            }
        }).then(() => {
            // Wrap around
            const wrappedX = ((targetX % totalWidth) + totalWidth) % totalWidth;
            x.set(-wrappedX);
        });
    };

    // Continuous wrapping check
    useEffect(() => {
        const unsubscribe = x.on("change", (latest) => {
            // If scrolled past one full set, wrap instantly
            if (latest < -totalWidth * 2) {
                x.set(latest + totalWidth);
            } else if (latest > 0) {
                x.set(latest - totalWidth);
            }
        });
        return unsubscribe;
    }, [totalWidth]);

    // Start auto-play when component mounts and searches are loaded
    useEffect(() => {
        if (recentSearches.length > 1) {
            startAutoPlay();
        }

        return () => {
            stopAutoPlay();
        };
    }, [recentSearches.length]);

    // Handle hover state changes
    useEffect(() => {
        // Auto-play will automatically pause/resume based on isHovered state
        // No need to stop/start interval, just let the interval check the state
    }, [isHovered]);

    if (recentSearches.length === 0) return null;

    return (
        <div className="recent-search-carousel">
            <h3 className="carousel-title">Recent Searches</h3>
            <div
                className="carousel-container"
                ref={containerRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {recentSearches.length > 4 && (
                    <button className="carousel-nav left" onClick={() => navigate(1)}>
                        <ChevronLeft size={20} />
                    </button>
                )}

                <div className="carousel-viewport">
                    <motion.div
                        className="recent-carousel-track-smooth"
                        drag="x"
                        dragConstraints={{ left: -totalWidth * 2, right: 0 }}
                        dragElastic={0.05}
                        dragTransition={{
                            power: 0.3,
                            timeConstant: 200,
                            modifyTarget: undefined
                        }}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        style={{ x }}
                        animate={controls}
                    >
                        {infiniteItems.map((search, idx) => (
                            <div
                                key={idx}
                                className="recent-search-item-compact"
                                onPointerDown={(e) => {
                                    // Track both X and Y coordinates for accurate drag detection
                                    pointerStartX.current = e.clientX;
                                    pointerStartY.current = e.clientY;
                                }}
                                onPointerUp={(e) => {
                                    // Calculate total movement distance (Euclidean distance)
                                    const deltaX = e.clientX - pointerStartX.current;
                                    const deltaY = e.clientY - pointerStartY.current;
                                    const totalDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                                    // If moved more than threshold or currently dragging, ignore the click
                                    if (totalDistance > DRAG_THRESHOLD || isDraggingRef.current) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        return;
                                    }

                                    // Valid click - trigger search selection
                                    onSearchSelect?.(search);
                                }}
                                style={{
                                    minWidth: `${ITEM_WIDTH - 12}px`,
                                    cursor: 'pointer',
                                    userSelect: 'none' // Prevent text selection during drag
                                }}
                            >
                                <img
                                    src={getImage(search.destination || search.location)}
                                    alt={search.destination || search.location}
                                    className="search-thumb"
                                    draggable="false"
                                />
                                <div className="search-info">
                                    <div className="search-route">
                                        {searchType === 'Flights' ? (
                                            <span>{search.origin?.split(',')[0]} → {search.destination?.split(',')[0]}</span>
                                        ) : (
                                            <span>{search.destination || search.location}</span>
                                        )}
                                    </div>
                                    <div className="search-meta">
                                        <Calendar size={12} />
                                        <span>{search.departDate || search.checkIn}</span>
                                    </div>
                                    <div className="search-meta">
                                        <Users size={12} />
                                        <span>{search.travelers || search.guests} {searchType === 'Stays' ? 'Guest' : 'Traveler'}{(search.travelers > 1 || search.guests > 1) ? 's' : ''}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {recentSearches.length > 4 && (
                    <button className="carousel-nav right" onClick={() => navigate(-1)}>
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default RecentSearchCarousel;
