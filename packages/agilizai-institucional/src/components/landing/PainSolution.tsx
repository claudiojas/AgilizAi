import { motion } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  MessageCircle,
  Smartphone,
  Zap,
  X,
  Check,
} from "lucide-react";

const painPoints = [
  {
    icon: DollarSign,
    title: "Taxas Abusivas",
    description: "Até 27% por pedido nos marketplaces",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Caótico",
    description: "Pedidos perdidos em conversas sem controle",
  },
  {
    icon: TrendingDown,
    title: "Margem Apertada",
    description: "Lucro comprometido a cada venda",
  },
];

const solutions = [
  {
    icon: Zap,
    title: "Zero Taxas",
    description: "100% do lucro fica com você",
  },
  {
    icon: Smartphone,
    title: "Cardápio Organizado",
    description: "Seus produtos sempre à mão do cliente",
  },
  {
    icon: TrendingUp,
    title: "Vendas Diretas",
    description: "Pedido direto no WhatsApp, sem intermediário",
  },
];

export function PainSolution() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pare de Perder Dinheiro com Taxas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra como restaurantes estão recuperando sua margem de lucro com
            o AgilizAI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Pain Points - Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-8 border-2 border-destructive/20 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-destructive/10">
                  <X className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-destructive">
                  O Jeito Antigo
                </h3>
              </div>

              <div className="space-y-6">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 rounded-xl bg-muted shrink-0">
                      <point.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {point.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Solutions - AgilizAI Way */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-8 border-2 border-olive/30 shadow-card relative overflow-hidden">
              {/* Subtle glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-olive/10 rounded-full blur-3xl" />

              <div className="flex items-center gap-3 mb-6 relative">
                <div className="p-2 rounded-xl bg-olive/10">
                  <Check className="h-5 w-5 text-olive" />
                </div>
                <h3 className="text-xl font-bold text-olive">
                  O Jeito AgilizAI
                </h3>
              </div>

              <div className="space-y-6 relative">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="p-2 rounded-xl bg-olive/10 shrink-0">
                      <solution.icon className="h-5 w-5 text-olive" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {solution.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {solution.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
