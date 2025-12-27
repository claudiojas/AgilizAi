import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileBottomBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-md border-t border-border/50 p-4 shadow-lg"
    >
      <Button
        variant="cta"
        size="xl"
        className="w-full gap-3 text-base"
        onClick={() => window.open("#signup", "_self")}
      >
        <Rocket className="h-5 w-5" />
        Quero meu Cardápio Grátis
      </Button>
    </motion.div>
  );
}
