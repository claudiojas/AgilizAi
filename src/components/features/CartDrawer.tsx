import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import emptyCartIllustration from '@/assets/empty-cart.svg';

interface CartDrawerProps {
  isDesktop?: boolean;
}

export const CartDrawer = ({ isDesktop = false }: CartDrawerProps) => {
  const { items, isOpen, closeCart, openCart, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();
  
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  // Desktop version - always visible
  if (isDesktop) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-glow">
            <ShoppingBag className="text-primary-foreground" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">Seu Pedido</h2>
            <p className="text-sm text-muted-foreground">{totalItems} itens</p>
          </div>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>
            </div>

            <CartSummary totalPrice={totalPrice} />
          </>
        )}
      </div>
    );
  }

  // Mobile version - floating button + drawer
  return (
    <>
      {/* Floating Cart Button */}
      <AnimatePresence>
        {!isOpen && totalItems > 0 && (
          <motion.button
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            whileTap={{ scale: 0.95 }}
            onClick={openCart}
            className="fixed bottom-24 right-4 z-40 bg-primary text-primary-foreground px-6 py-4 rounded-2xl shadow-glow flex items-center gap-3"
          >
            <ShoppingBag size={24} />
            <div className="text-left">
              <p className="font-bold">Ver Carrinho</p>
              <p className="text-sm opacity-90">R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="bg-primary-foreground text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-3xl z-50 max-h-[85vh] flex flex-col safe-bottom"
            >
              {/* Handle */}
              <div className="py-3 flex justify-center">
                <div className="w-12 h-1.5 bg-muted rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-6 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <ShoppingBag className="text-primary-foreground" size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground">Seu Pedido</h2>
                    <p className="text-sm text-muted-foreground">{totalItems} itens</p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
                >
                  <X size={20} className="text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              {items.length === 0 ? (
                <EmptyCart />
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-hide">
                    <AnimatePresence>
                      {items.map((item) => (
                        <CartItem
                          key={item.id}
                          item={item}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeItem}
                        />
                      ))}
                    </AnimatePresence>
                  </div>

                  <CartSummary totalPrice={totalPrice} />
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const EmptyCart = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
    <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
      <ShoppingBag size={48} className="text-muted-foreground" />
    </div>
    <h3 className="font-bold text-lg text-foreground">Carrinho vazio</h3>
    <p className="text-muted-foreground mt-2">
      Adicione itens deliciosos do nosso cardápio!
    </p>
  </div>
);

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20, height: 0 }}
    className="flex items-center gap-4 bg-muted/50 p-3 rounded-2xl"
  >
    <img
      src={item.image}
      alt={item.name}
      className="w-16 h-16 rounded-xl object-cover"
    />
    <div className="flex-1 min-w-0">
      <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
      <p className="text-primary font-bold">
        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        className="w-8 h-8 rounded-lg bg-card flex items-center justify-center"
      >
        {item.quantity === 1 ? (
          <Trash2 size={16} className="text-destructive" />
        ) : (
          <Minus size={16} className="text-muted-foreground" />
        )}
      </motion.button>
      <span className="w-8 text-center font-bold text-foreground">{item.quantity}</span>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"
      >
        <Plus size={16} />
      </motion.button>
    </div>
  </motion.div>
);

const CartSummary = ({ totalPrice }: { totalPrice: number }) => (
  <div className="p-6 border-t border-border bg-card">
    <div className="flex justify-between items-center mb-4">
      <span className="text-muted-foreground">Subtotal</span>
      <span className="font-bold text-foreground">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
    </div>
    <div className="flex justify-between items-center mb-6">
      <span className="text-muted-foreground">Taxa de entrega</span>
      <span className="font-bold text-secondary">Grátis</span>
    </div>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg shadow-glow flex items-center justify-center gap-2"
    >
      Finalizar Pedido
      <ChevronRight size={20} />
    </motion.button>
  </div>
);
