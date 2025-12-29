import { Layout } from '@/components/navigation/Layout';
import { Button } from '@/components/ui/button';
import { User, LogOut, Settings, HelpCircle, FileText } from 'lucide-react';

export default function Profile() {
  return (
    <Layout title="Perfil">
      <div className="max-w-2xl space-y-6 animate-slide-up">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">João da Pizzaria</h3>
              <p className="text-sm text-muted-foreground">joao@pizzaria.com</p>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="text-foreground">Configurações da Conta</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <span className="text-foreground">Ajuda e Suporte</span>
          </button>
          <button className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <span className="text-foreground">Termos e Privacidade</span>
          </button>
        </div>

        {/* Logout */}
        <Button variant="outline" size="lg" className="w-full text-destructive hover:text-destructive">
          <LogOut className="h-4 w-4" />
          Sair da Conta
        </Button>
      </div>
    </Layout>
  );
}
