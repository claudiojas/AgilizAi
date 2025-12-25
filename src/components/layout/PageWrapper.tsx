import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { MobileNav } from './MobileNav';
import { DesktopSidebar } from './DesktopSidebar';
import { CartDrawer } from '@/components/features/CartDrawer';

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const { isMobile, isTablet } = useMobileDetection();
  const showMobileLayout = isMobile || isTablet;

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {showMobileLayout ? (
          <motion.div
            key="mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col min-h-screen"
          >
            {/* Mobile Content */}
            <main className="flex-1 pb-24 safe-top">
              {children}
            </main>
            <MobileNav />
            <CartDrawer />
          </motion.div>
        ) : (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen"
          >
            <DesktopSidebar />
            {/* Desktop Content */}
            <main className="flex-1 ml-64 mr-80">
              {children}
            </main>
            {/* Sticky Cart Column */}
            <aside className="fixed right-0 top-0 h-full w-80 border-l border-border bg-card p-6 overflow-y-auto">
              <CartDrawer isDesktop />
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
