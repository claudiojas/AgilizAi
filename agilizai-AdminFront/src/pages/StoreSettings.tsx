import { Layout } from '@/components/navigation/Layout';
import { useStore } from '@/hooks/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ImagePlus, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export default function StoreSettings() {
  const { store, updateStore } = useStore();
  const [name, setName] = useState(store.name);
  const [paymentMethods, setPaymentMethods] = useState(store.paymentMethods);

  const handleSave = () => {
    updateStore({
      name,
      paymentMethods,
    });
    toast({
      title: "Configurações salvas!",
      description: "As alterações foram aplicadas com sucesso.",
    });
  };

  return (
    <Layout title="Minha Loja">
      <div className="max-w-2xl space-y-6 animate-slide-up">
        {/* Store Info */}
        <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
          <h3 className="font-display font-semibold text-lg text-foreground">Informações da Loja</h3>
          
          <div className="space-y-2">
            <Label htmlFor="store-name">Nome da Loja</Label>
            <Input
              id="store-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center">
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <Button variant="outline">Alterar Logo</Button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-card rounded-2xl p-6 border border-border space-y-6">
          <h3 className="font-display font-semibold text-lg text-foreground">Formas de Pagamento</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="pix"
                checked={paymentMethods.pix}
                onCheckedChange={(checked) => 
                  setPaymentMethods(prev => ({ ...prev, pix: !!checked }))
                }
              />
              <Label htmlFor="pix" className="font-normal cursor-pointer">PIX</Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="card"
                checked={paymentMethods.card}
                onCheckedChange={(checked) => 
                  setPaymentMethods(prev => ({ ...prev, card: !!checked }))
                }
              />
              <Label htmlFor="card" className="font-normal cursor-pointer">Cartão de Crédito/Débito</Label>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="cash"
                checked={paymentMethods.cash}
                onCheckedChange={(checked) => 
                  setPaymentMethods(prev => ({ ...prev, cash: !!checked }))
                }
              />
              <Label htmlFor="cash" className="font-normal cursor-pointer">Dinheiro</Label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <Button size="lg" onClick={handleSave} className="w-full">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>
    </Layout>
  );
}
