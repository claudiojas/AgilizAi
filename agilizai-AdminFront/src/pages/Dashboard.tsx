import { Layout } from '@/components/navigation/Layout';
import { useStore } from '@/hooks/useStore';
import { useOrders, formatCurrency } from '@/hooks/useOrders';
import { 
  ClipboardList, 
  DollarSign, 
  TrendingUp, 
  Link2, 
  Copy, 
  Check,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { store, copyMenuLink } = useStore();
  const { getTodayStats } = useOrders();
  const stats = getTodayStats();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const success = await copyMenuLink();
    if (success) {
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "Compartilhe com seus clientes.",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Layout title="Dashboard">
      <div className="space-y-6 animate-slide-up">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-primary-foreground">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
            Olá, {store.name}! 👋
          </h2>
          <p className="text-primary-foreground/80">
            {store.isOpen 
              ? 'Sua loja está aberta e recebendo pedidos.' 
              : 'Sua loja está fechada no momento.'}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="metric-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Pedidos Hoje</span>
            </div>
            <p className="font-display font-bold text-3xl text-foreground">{stats.totalOrders}</p>
          </div>

          <div className="metric-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-store-open/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-store-open" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Faturamento</span>
            </div>
            <p className="font-display font-bold text-3xl text-foreground">
              {formatCurrency(stats.totalRevenue)}
            </p>
          </div>

          <div className="metric-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Ticket Médio</span>
            </div>
            <p className="font-display font-bold text-3xl text-foreground">
              {formatCurrency(stats.averageTicket)}
            </p>
          </div>
        </div>

        {/* Share Link Card */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
              <Link2 className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                Compartilhe seu cardápio
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Envie o link para seus clientes fazerem pedidos online
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm text-muted-foreground truncate">
                  {store.menuUrl}
                </div>
                <Button onClick={handleCopyLink} variant={copied ? "success" : "default"} size="touch">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copiar Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/orders" className="block">
            <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    Ver Pedidos
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Gerencie pedidos em tempo real
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>

          <Link to="/menu" className="block">
            <div className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    Editar Cardápio
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Atualize preços e disponibilidade
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
