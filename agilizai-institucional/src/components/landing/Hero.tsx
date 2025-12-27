import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket, Sparkles, ChefHat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-agilizai.png";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-20 md:pt-0 overflow-hidden bg-gradient-hero">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 rounded-full bg-cheese/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-8 md:gap-16 py-12">
          {/* Mobile: Logo/Mockup First */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="md:hidden w-full flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={logo}
                  alt="AgilizAI - Cardápio Digital"
                  className="w-48 h-48 object-contain drop-shadow-2xl"
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-foreground/10 rounded-full blur-md"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-center md:text-left max-w-2xl"
          >
            {/* Beta Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cheese/10 border border-cheese/30 mb-6"
            >
              <Sparkles className="h-4 w-4 text-cheese" />
              <span className="text-sm font-semibold text-cheese">
                Beta Gratuito • Vagas Limitadas
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              O Cardápio Digital que{" "}
              <span className="text-gradient">Decola suas Vendas</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
              Crie seu catálogo online <strong>100% gratuito</strong> e venda
              diretamente pelo WhatsApp. Sem taxas de marketplace, sem
              complicação.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button variant="cta" size="xl" className="gap-3 group" asChild>
                <Link to="/signup">
                  <Rocket className="h-5 w-5 group-hover:animate-bounce" />
                  Quero meu Cardápio Grátis
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="hero" size="xl" className="gap-2">
                <ChefHat className="h-5 w-5" />
                Ver Demo
              </Button>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-6 justify-center md:justify-start text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-olive" />
                <span>Sem taxas por pedido</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-olive" />
                <span>Configuração em minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-olive" />
                <span>Integração WhatsApp</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Desktop: Logo/Mockup Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:flex flex-1 justify-center items-center"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cheese/30 to-primary/20 rounded-full blur-3xl scale-150" />

              {/* Floating Logo */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <img
                  src={logo}
                  alt="AgilizAI - Cardápio Digital"
                  className="w-72 h-72 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Shadow */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-6 bg-foreground/10 rounded-full blur-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 p-3 bg-card rounded-2xl shadow-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <ChefHat className="h-6 w-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-8 p-3 bg-card rounded-2xl shadow-card"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              >
                <Sparkles className="h-6 w-6 text-cheese" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
