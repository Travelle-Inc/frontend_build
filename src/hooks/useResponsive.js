import { useState, useEffect, useCallback } from 'react';

// Breakpoint values matching index.css
const BREAKPOINTS = {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
    largeDesktop: 1280
};

/**
 * Custom hook for responsive design
 * Returns current breakpoint and boolean flags for common checks
 */
export const useResponsive = () => {
    const getBreakpoint = useCallback(() => {
        if (typeof window === 'undefined') return 'mobile';
        
        const width = window.innerWidth;
        if (width >= BREAKPOINTS.largeDesktop) return 'largeDesktop';
        if (width >= BREAKPOINTS.desktop) return 'desktop';
        if (width >= BREAKPOINTS.tablet) return 'tablet';
        return 'mobile';
    }, []);

    const [breakpoint, setBreakpoint] = useState(getBreakpoint);
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    useEffect(() => {
        let timeoutId = null;
        
        const handleResize = () => {
            // Debounce resize events
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setBreakpoint(getBreakpoint());
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, 100);
        };

        window.addEventListener('resize', handleResize);
        
        // Initial check
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [getBreakpoint]);

    return {
        breakpoint,
        windowSize,
        // Boolean flags for easy conditional rendering
        isMobile: breakpoint === 'mobile',
        isTablet: breakpoint === 'tablet',
        isDesktop: breakpoint === 'desktop' || breakpoint === 'largeDesktop',
        isLargeDesktop: breakpoint === 'largeDesktop',
        // Combined checks
        isMobileOrTablet: breakpoint === 'mobile' || breakpoint === 'tablet',
        isTabletOrDesktop: breakpoint !== 'mobile',
        // Screen size checks
        isSmallScreen: windowSize.width < BREAKPOINTS.tablet,
        isMediumScreen: windowSize.width >= BREAKPOINTS.tablet && windowSize.width < BREAKPOINTS.desktop,
        isLargeScreen: windowSize.width >= BREAKPOINTS.desktop
    };
};

/**
 * Hook to detect if device supports touch
 */
export const useIsTouchDevice = () => {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        setIsTouchDevice(
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0
        );
    }, []);

    return isTouchDevice;
};

/**
 * Hook to manage drawer state with body scroll lock
 */
export const useDrawer = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const open = useCallback(() => {
        setIsOpen(true);
        document.body.classList.add('drawer-open');
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        document.body.classList.remove('drawer-open');
    }, []);

    const toggle = useCallback(() => {
        if (isOpen) {
            close();
        } else {
            open();
        }
    }, [isOpen, open, close]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.classList.remove('drawer-open');
        };
    }, []);

    return { isOpen, open, close, toggle };
};

export default useResponsive;

