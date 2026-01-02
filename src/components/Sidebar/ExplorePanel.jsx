import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Compass, Eye, Coffee, Users, User, Shield, ChevronLeft } from 'lucide-react';
import './ExplorePanel.css';

const ExplorePanel = ({ isOpen, onClose }) => {
    const panelRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const items = [
        { icon: Heart, label: "Travelle 4 Life™", id: "t4l" },
        { icon: Compass, label: "Journii's™ Experiences", id: "experiences" },
        { icon: Eye, label: "VR/AR Tours", id: "tours" },
        { icon: Coffee, label: "Lounges", id: "lounges" },
        { icon: Users, label: "Travelle™ Ambassadors", id: "ambassadors" },
        { icon: User, label: "Travelle™ Agents", id: "agents" },
        { icon: Shield, label: "Travel Insurance", id: "insurance" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={panelRef}
                    className="explore-panel"
                    initial={{ opacity: 0, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <button className="explore-close-btn" onClick={onClose}>
                        <ChevronLeft size={16} />
                    </button>

                    <div className="explore-items-container">
                        {items.map((item, index) => (
                            <div key={item.id} className="explore-item">
                                <item.icon size={18} className={item.id === 't4l' ? 'heart-icon' : ''} />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExplorePanel;
