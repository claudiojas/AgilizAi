import { Layout } from '@/components/navigation/Layout';
import { useMenu, MenuItem } from '@/hooks/useMenu';
import { formatCurrency } from '@/hooks/useOrders';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit2, ImagePlus, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useIsDesktop } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

function MenuItemRow({ item, onToggle, onEdit }: { 
  item: MenuItem; 
  onToggle: () => void;
  onEdit: () => void;
}) {
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl border border-border transition-all",
      !item.available && "opacity-60 bg-muted/50"
    )}>
      {/* Image placeholder */}
      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <ImagePlus className="h-6 w-6 text-muted-foreground" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-foreground truncate">{item.name}</h4>
          {!item.available && (
            <span className="text-xs text-destructive font-medium">Indisponível</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{item.description}</p>
        <p className="text-sm font-semibold text-primary mt-1">{formatCurrency(item.price)}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <Switch
          checked={item.available}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-store-open"
        />
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function EditItemForm({ item, onSave, onClose }: { 
  item: MenuItem; 
  onSave: (updates: Partial<MenuItem>) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      description,
      price: parseFloat(price),
    });
    toast({
      title: "Item atualizado!",
      description: `${name} foi salvo com sucesso.`,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Item</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 rounded-xl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-xl resize-none"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Preço (R$)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="h-12 rounded-xl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Imagem</Label>
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center">
          <ImagePlus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Clique para fazer upload</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" size="lg" className="flex-1">
          Salvar
        </Button>
      </div>
    </form>
  );
}

function CategorySection({ category, items, onToggle, onEdit }: {
  category: { id: string; name: string };
  items: MenuItem[];
  onToggle: (id: string) => void;
  onEdit: (item: MenuItem) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const isDesktop = useIsDesktop();

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-display font-semibold text-lg text-foreground">{category.name}</h3>
          <span className="text-sm text-muted-foreground">({items.length} itens)</span>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {expanded && (
        <div className="p-4 pt-0 space-y-3">
          {items.map((item) => (
            isDesktop ? (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div>
                    <MenuItemRow 
                      item={item} 
                      onToggle={() => onToggle(item.id)}
                      onEdit={() => {}}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Editar Item</DialogTitle>
                  </DialogHeader>
                  <EditItemForm 
                    item={item} 
                    onSave={(updates) => onEdit({ ...item, ...updates })}
                    onClose={() => {}}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <Sheet key={item.id}>
                <SheetTrigger asChild>
                  <div>
                    <MenuItemRow 
                      item={item} 
                      onToggle={() => onToggle(item.id)}
                      onEdit={() => {}}
                    />
                  </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle>Editar Item</SheetTitle>
                  </SheetHeader>
                  <EditItemForm 
                    item={item} 
                    onSave={(updates) => onEdit({ ...item, ...updates })}
                    onClose={() => {}}
                  />
                </SheetContent>
              </Sheet>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default function MenuManagement() {
  const { getGroupedItems, toggleAvailability, updateItem } = useMenu();
  const groupedItems = getGroupedItems();

  const handleEdit = (item: MenuItem) => {
    updateItem(item.id, item);
  };

  return (
    <Layout title="Cardápio">
      <div className="space-y-4 animate-slide-up">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Total de Itens</p>
            <p className="font-display font-bold text-2xl text-foreground">
              {groupedItems.reduce((sum, cat) => sum + cat.items.length, 0)}
            </p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-sm text-muted-foreground">Indisponíveis</p>
            <p className="font-display font-bold text-2xl text-destructive">
              {groupedItems.reduce((sum, cat) => sum + cat.items.filter(i => !i.available).length, 0)}
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {groupedItems.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              items={category.items}
              onToggle={toggleAvailability}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
