import { useState, useEffect, useMemo } from 'react';

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

interface DeviceState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isHydrated: boolean;
}

/**
 * Hook that handles mobile detection with proper hydration handling.
 * Uses CSS media queries as fallback during SSR/initial render.
 */
export const useIsMobile = (): DeviceState => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    // Mark as hydrated and set initial width
    setWindowWidth(window.innerWidth);
    setIsHydrated(true);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(document.body);
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const deviceState = useMemo<DeviceState>(() => {
    if (!isHydrated || windowWidth === null) {
      // During SSR or before hydration, return safe defaults
      // CSS media queries will handle the actual visibility
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isHydrated: false,
      };
    }

    return {
      isMobile: windowWidth < MOBILE_BREAKPOINT,
      isTablet: windowWidth >= MOBILE_BREAKPOINT && windowWidth < TABLET_BREAKPOINT,
      isDesktop: windowWidth >= TABLET_BREAKPOINT,
      isHydrated: true,
    };
  }, [windowWidth, isHydrated]);

  return deviceState;
};

export default useIsMobile;
