import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";

const notifications = [
  {
    title: "Seu pedido foi confirmado!",
    description: "Pedido #12345 - Pizza de Calabresa e Coca-Cola.",
    time: "5m atrás",
  },
  {
    title: "Oba! Seu pedido saiu para entrega.",
    description: "Prepare-se, sua comida está chegando!",
    time: "1m atrás",
  },
  {
    title: "Cupom de 10% OFF liberado!",
    description: "Use o código AGILIZAI10 na sua próxima compra.",
    time: "2h atrás",
  },
];

export const NotificationsDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative w-10 h-10 bg-card rounded-xl flex items-center justify-center shadow-soft"
        >
          <Bell size={20} className="text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
            <span className="text-[10px] text-primary-foreground font-bold">
              {notifications.length}
            </span>
          </span>
        </motion.button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Notificações</DrawerTitle>
          <DrawerDescription>
            Você tem {notifications.length} notificações não lidas.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-sm">{notification.title}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
