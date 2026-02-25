import { motion } from "framer-motion";
import { Rocket, MessageSquare, Gift, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BetaDeal() {
  return (
    <section id="signup" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-cheese/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-3xl border-2 border-cheese/30 shadow-glow p-8 md:p-12 text-center relative overflow-hidden">
            {/* Corner badge */}
            <div className="absolute -top-3 -right-3 bg-cheese text-secondary-foreground px-4 py-1 rounded-full text-sm font-bold rotate-12 shadow-lg">
              GRÁTIS
            </div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex p-4 bg-cheese/10 rounded-2xl mb-6"
            >
              <Gift className="h-10 w-10 text-cheese" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que é <span className="text-gradient">100% Gratuito</span>?
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Estamos em fase Beta e queremos construir a melhor ferramenta junto
              com você. Em troca do acesso gratuito, pedimos apenas seu feedback
              honesto para melhorar o produto.
            </p>

            {/* Benefits grid */}
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {[
                {
                  icon: Rocket,
                  title: "Acesso Antecipado",
                  description: "Use todas as funcionalidades antes de todos",
                },
                {
                  icon: MessageSquare,
                  title: "Seu Feedback Importa",
                  description: "Ajude a moldar o futuro do produto",
                },
                {
                  icon: Users,
                  title: "Comunidade Beta",
                  description: "Faça parte de um grupo seleto de pioneiros",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="p-3 bg-muted rounded-xl mb-3">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="cta" size="xl" className="gap-3 animate-pulse-glow">
                <Rocket className="h-5 w-5" />
                Quero meu Cardápio Grátis
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Vagas limitadas • Sem cartão de crédito
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
