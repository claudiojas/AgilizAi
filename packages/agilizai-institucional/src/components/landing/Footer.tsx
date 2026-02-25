import { Instagram, Linkedin, Mail } from "lucide-react";
import logo from "@/assets/logo-agilizai.png";

const footerLinks = {
  produto: [
    { label: "Funcionalidades", href: "#features" },
    { label: "Como Funciona", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  contato: [
    { label: "Suporte", href: "mailto:suporte@agilizai.com" },
    { label: "Parcerias", href: "mailto:parcerias@agilizai.com" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contato@agilizai.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logo}
                alt="AgilizAI"
                className="h-12 w-12 object-contain"
              />
              <span className="text-2xl font-bold">
                Agiliz<span className="text-primary">AI</span>
              </span>
            </div>
            <p className="text-background/70 mb-6 max-w-sm">
              O cardápio digital que decola suas vendas. Crie seu catálogo
              online gratuito e venda diretamente pelo WhatsApp.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-xl bg-background/10 hover:bg-background/20 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-bold mb-4">Produto</h4>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-3">
              {footerLinks.contato.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} AgilizAI. Todos os direitos reservados.
          </p>
          <p className="text-sm text-background/50">
            Powered by{" "}
            <a
              href="https://moduloweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              Modulo Web
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
