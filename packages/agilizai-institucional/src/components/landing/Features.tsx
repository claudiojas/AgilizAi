import { useRef } from "react";
import { motion } from "framer-motion";
import {
  CircleDot,
  ShoppingCart,
  Send,
  Palette,
  Clock,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: CircleDot,
    title: "Menu Circular",
    description:
      "Apresentação visual única que destaca seus pratos de forma irresistível",
    color: "primary",
  },
  {
    icon: ShoppingCart,
    title: "Carrinho Inteligente",
    description:
      "Persistência automática - cliente nunca perde os itens selecionados",
    color: "cheese",
  },
  {
    icon: Send,
    title: "Checkout WhatsApp",
    description: "Pedido formatado direto no seu WhatsApp, pronto para confirmar",
    color: "olive",
  },
  {
    icon: Palette,
    title: "Personalização Total",
    description: "Cores, logo e estilo do seu estabelecimento",
    color: "secondary",
  },
  {
    icon: Clock,
    title: "Horários Flexíveis",
    description: "Configure horário de funcionamento e pausas automaticamente",
    color: "primary",
  },
  {
    icon: BarChart3,
    title: "Métricas Básicas",
    description: "Acompanhe visualizações e itens mais populares",
    color: "cheese",
  },
];

const colorVariants: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  cheese: "bg-cheese/10 text-cheese",
  olive: "bg-olive/10 text-olive",
  secondary: "bg-secondary text-secondary-foreground",
};

export function Features() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tudo que Você Precisa para Vender Mais
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Funcionalidades pensadas para restaurantes, pizzarias e lanchonetes
          </p>
        </motion.div>

        {/* Mobile: Swipeable Cards */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="swipe-container -mx-4 px-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="swipe-item w-[280px]"
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            ← Deslize para ver mais →
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FeatureCard feature={feature} isDesktop />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  isDesktop = false,
}: {
  feature: (typeof features)[0];
  isDesktop?: boolean;
}) {
  const Icon = feature.icon;

  return (
    <div
      className={`
        bg-card rounded-2xl p-6 border border-border/50 shadow-card h-full
        ${isDesktop ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300" : ""}
      `}
    >
      <div
        className={`inline-flex p-3 rounded-xl mb-4 ${colorVariants[feature.color]}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
      <p className="text-muted-foreground text-sm">{feature.description}</p>
    </div>
  );
}
