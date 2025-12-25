import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useNavigationStore } from '@/store/navigationStore';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { SpinningPlateMenu } from '@/components/features/SpinningPlateMenu';
import { ProductCard } from '@/components/features/ProductCard';
import { MobileHeader } from '@/components/features/MobileHeader';
import { DesktopHeader } from '@/components/features/DesktopHeader';
import { CategoryTabs } from '@/components/features/CategoryTabs';
import { SearchPage } from '@/components/features/SearchPage';
import { OrdersPage } from '@/components/features/OrdersPage';
import { ProfilePage } from '@/components/features/ProfilePage';
import { getProductsByCategory } from '@/data/products';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('burgers');
  const { isMobile, isTablet } = useIsMobile();
  const { currentPage } = useNavigationStore();
  const showMobileLayout = isMobile || isTablet;

  const products = getProductsByCategory(selectedCategory);

  // Render the appropriate page based on navigation
  const renderContent = () => {
    switch (currentPage) {
      case 'search':
        return <SearchPage />;
      case 'orders':
        return <OrdersPage />;
      case 'profile':
        return <ProfilePage />;
      case 'home':
      default:
        return showMobileLayout ? (
          <MobileLayout
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            products={products}
          />
        ) : (
          <DesktopLayout
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            products={products}
          />
        );
    }
  };

  return (
    <PageWrapper>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </PageWrapper>
  );
};

interface LayoutProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  products: ReturnType<typeof getProductsByCategory>;
}

const MobileLayout = ({ selectedCategory, setSelectedCategory, products }: LayoutProps) => (
  <>
    <MobileHeader />
    
    {/* Hero Section */}
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 pt-2"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-light/30 rounded-full blur-2xl" />
        <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-primary-light/20 rounded-full blur-xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} />
            <span className="text-sm font-semibold opacity-90">Oferta do Dia</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">Combo Especial</h2>
          <p className="text-sm opacity-90 mb-4">Burger + Batata + Bebida</p>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">R$ 34,90</span>
            <span className="text-sm line-through opacity-60">R$ 49,90</span>
          </div>
        </div>
      </motion.div>
    </motion.section>

    {/* Spinning Plate Menu */}
    <section className="mt-6">
      <SpinningPlateMenu
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
    </section>

    {/* Products Grid */}
    <section className="px-4 mt-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-4"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  </>
);

const DesktopLayout = ({ selectedCategory, setSelectedCategory, products }: LayoutProps) => (
  <>
    <DesktopHeader />
    
    <div className="p-8">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-primary via-primary to-primary-dark rounded-3xl p-8 text-primary-foreground relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary-light/20 to-transparent" />
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-light/30 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={20} />
              <span className="font-semibold opacity-90">Oferta Especial do Dia</span>
            </div>
            <h2 className="text-4xl font-bold mb-2">Combo Família Feliz</h2>
            <p className="text-lg opacity-90 mb-6">
              2 Burgers + Pizza Média + Batata Grande + 4 Refrigerantes
            </p>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">R$ 89,90</span>
              <span className="text-xl line-through opacity-60">R$ 129,90</span>
              <span className="bg-primary-foreground text-primary px-4 py-2 rounded-xl font-bold">
                -30%
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Categories */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  </>
);

export default Index;
