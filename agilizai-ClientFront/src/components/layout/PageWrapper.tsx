import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MobileNav } from './MobileNav';
import { DesktopSidebar } from './DesktopSidebar';
import { CartDrawer } from '@/components/features/CartDrawer';

interface PageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const { isMobile, isTablet, isHydrated } = useIsMobile();
  const showMobileLayout = isMobile || isTablet;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Layout - CSS hidden on desktop, shown on mobile/tablet */}
      <div className={`lg:hidden ${isHydrated && !showMobileLayout ? 'hidden' : ''}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col min-h-screen"
        >
          <main className="flex-1 pb-24 safe-top">
            {children}
          </main>
          <MobileNav />
          <CartDrawer />
        </motion.div>
      </div>

      {/* Desktop Layout - CSS hidden on mobile, shown on desktop */}
      <div className={`hidden lg:block ${isHydrated && showMobileLayout ? '!hidden' : ''}`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="flex min-h-screen"
        >
          <DesktopSidebar />
          <main className="flex-1 ml-64 mr-80">
            {children}
          </main>
          <aside className="fixed right-0 top-0 h-full w-80 border-l border-border bg-card p-6 overflow-y-auto">
            <CartDrawer isDesktop />
          </aside>
        </motion.div>
      </div>
    </div>
  );
};
