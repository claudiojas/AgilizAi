import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Rocket, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import logo from "@/assets/logo-agilizai.png";

const navLinks = [
  { label: "Funcionalidades", href: "#features" },
  { label: "Como Funciona", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <motion.img
              src={logo}
              alt="AgilizAI Logo"
              className="h-10 w-10 md:h-12 md:w-12 object-contain"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <span className="text-xl md:text-2xl font-bold text-foreground">
              Agiliz<span className="text-primary">AI</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="cta" size="default" className="gap-2 group" asChild>
              <Link to="/signup">
                Quero meu Cardápio Grátis
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="touch-target">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background">
                <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
                <div className="flex flex-col gap-8 mt-8">
                  <div className="flex items-center gap-2">
                    <a href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                      <img
                        src={logo}
                        alt="AgilizAI"
                        className="h-10 w-10 object-contain"
                      />
                      <span className="text-xl font-bold">
                        Agiliz<span className="text-primary">AI</span>
                      </span>
                    </a>
                  </div>

                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  <Button variant="cta" size="touch" className="w-full gap-2" asChild>
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      <Rocket className="h-5 w-5" />
                      Quero meu Cardápio Grátis
                    </Link>
                  </Button>

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
