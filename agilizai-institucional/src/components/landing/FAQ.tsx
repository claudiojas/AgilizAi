import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O AgilizAI é realmente gratuito?",
    answer:
      "Sim! Durante a fase Beta, todas as funcionalidades são 100% gratuitas. Não cobramos taxas por pedido, mensalidade ou comissões. Em troca, pedimos apenas seu feedback para melhorar o produto.",
  },
  {
    question: "Como funciona a integração com WhatsApp?",
    answer:
      "Quando o cliente finaliza o pedido no seu cardápio digital, ele é redirecionado automaticamente para o WhatsApp do seu estabelecimento com uma mensagem formatada contendo todos os itens, quantidades e valores. Você só precisa confirmar!",
  },
  {
    question: "Preciso de conhecimento técnico para usar?",
    answer:
      "Não! O AgilizAI foi feito para ser simples. Em poucos minutos você cadastra seus produtos, personaliza as cores e já tem seu cardápio online pronto para compartilhar com os clientes.",
  },
  {
    question: "Posso personalizar o visual do meu cardápio?",
    answer:
      "Sim! Você pode adicionar seu logo, escolher cores que combinam com sua marca e organizar os produtos em categorias. O cardápio fica com a cara do seu estabelecimento.",
  },
  {
    question: "E se eu quiser parar de usar?",
    answer:
      "Você pode cancelar a qualquer momento sem nenhum custo ou compromisso. Seus dados ficam salvos por 30 dias caso queira voltar.",
  },
  {
    question: "Quantos produtos posso cadastrar?",
    answer:
      "Não há limite de produtos durante o Beta! Cadastre todos os itens do seu cardápio, crie combos e promoções à vontade.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre o AgilizAI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl border border-border/50 px-6 shadow-card overflow-hidden"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
