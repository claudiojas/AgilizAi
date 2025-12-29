import { usePaymentMethodsStore } from "@/store/paymentMethodsStore";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Star, MoreVertical } from "lucide-react";
// A simple helper to get brand logos. In a real app, these would be proper assets.
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";

const BrandIcon = ({ brand }: { brand: string }) => {
    switch (brand) {
        case 'visa': return <FaCcVisa className="h-8 w-8" />;
        case 'mastercard': return <FaCcMastercard className="h-8 w-8" />;
        case 'amex': return <FaCcAmex className="h-8 w-8" />;
        default: return <div className="h-8 w-8 bg-gray-400 rounded" />;
    }
}

export const PaymentMethodsPage = () => {
  const { methods, setPrimary } = usePaymentMethodsStore();

  return (
    <PageWrapper title="Formas de Pagamento">
      <div className="p-4 space-y-4">
        {methods.map((method) => (
          <Card key={method.id} className="overflow-hidden">
            <CardContent className="p-4 flex items-center gap-4">
                <BrandIcon brand={method.brand} />
                <div className="flex-1">
                    <p className="font-semibold">
                        **** **** **** {method.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Expira em {method.expiry}
                    </p>
                </div>
                {method.isPrimary && (
                    <div className="flex items-center gap-1 text-xs text-secondary font-semibold">
                        <Star className="h-4 w-4 fill-current" />
                        <span>Padrão</span>
                    </div>
                )}
                 <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="p-4">
        <Button className="w-full" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Novo Método
        </Button>
      </div>
    </PageWrapper>
  );
};
