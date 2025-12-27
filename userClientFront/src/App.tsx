import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout Components
import { useIsMobile } from "./hooks/useIsMobile";
import { MobileNav } from "./components/layout/MobileNav";
import { DesktopSidebar } from "./components/layout/DesktopSidebar";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AddressesPage } from "./pages/AddressesPage";
import { SearchPage } from "./pages/SearchPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PersonalDataPage } from "./pages/PersonalDataPage";
import { PaymentMethodsPage } from "./pages/PaymentMethodsPage";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isMobile } = useIsMobile();

  return (
    <BrowserRouter>
      {isMobile ? <MobileNav /> : <DesktopSidebar />}
      <main className={!isMobile ? "pl-64" : "pb-24"}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/personal-data" element={<PersonalDataPage />} />
          <Route path="/profile/payment-methods" element={<PaymentMethodsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
