import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { PainSolution } from "@/components/landing/PainSolution";
import { Features } from "@/components/landing/Features";
import { FAQ } from "@/components/landing/FAQ";
import { BetaDeal } from "@/components/landing/BetaDeal";
import { Footer } from "@/components/landing/Footer";
import { MobileBottomBar } from "@/components/landing/MobileBottomBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PainSolution />
        <Features />
        <FAQ />
        <BetaDeal />
      </main>
      <Footer />
      <MobileBottomBar />
      {/* Spacer for mobile bottom bar */}
      <div className="h-24 md:hidden" />
    </div>
  );
};

export default Index;
