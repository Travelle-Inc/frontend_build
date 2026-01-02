import { useState, useEffect } from 'react';

/**
 * Centered dropdown positioning hook - centers dropdowns in viewport
 *
 * @param {Object} triggerRef - Ref to the trigger element (not used for positioning, kept for API compatibility)
 * @param {Object} dropdownRef - Ref to the dropdown element
 * @param {boolean} isOpen - Whether the dropdown is open
 * @param {Object} options - Configuration options
 * @returns {Object} { style, placement } - Style object and placement direction
 */
const useSmartDropdownPosition = (triggerRef, dropdownRef, isOpen, options = {}) => {
    const [position, setPosition] = useState({
        style: {},
        placement: 'center'
    });

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const calculatePosition = () => {
            const dropdownRect = dropdownRef?.current?.getBoundingClientRect();

            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            // Default dropdown dimensions (if not yet rendered)
            const dropdownHeight = dropdownRect?.height || 400;
            const dropdownWidth = dropdownRect?.width || 360;

            // Center horizontally
            const left = (viewportWidth - dropdownWidth) / 2;

            // Center vertically
            const top = (viewportHeight - dropdownHeight) / 2;

            // Calculate max-height to ensure dropdown fits in viewport
            const maxHeight = viewportHeight - 100; // 50px margin top and bottom

            setPosition({
                style: {
                    position: 'fixed',
                    top: `${Math.max(50, top)}px`, // Minimum 50px from top
                    left: `${Math.max(16, left)}px`, // Minimum 16px from left
                    maxHeight: `${Math.max(300, maxHeight)}px`, // Minimum 300px
                    zIndex: 1100
                },
                placement: 'center'
            });
        };

        // Calculate initial position
        calculatePosition();

        // Recalculate on resize
        const handleRecalculate = () => {
            calculatePosition();
        };

        window.addEventListener('resize', handleRecalculate);

        return () => {
            window.removeEventListener('resize', handleRecalculate);
        };
    }, [isOpen, dropdownRef]);

    return position;
};

export default useSmartDropdownPosition;

