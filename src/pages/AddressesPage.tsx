import { useState } from "react";
import { useAddressStore, Address } from "@/store/addressStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddressForm } from "@/components/features/AddressForm";
import { PlusCircle, MoreVertical, Edit, Trash2 } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AddressesPage = () => {
  const { addresses, selectedAddressId, selectAddress, removeAddress } = useAddressStore();
  
  // State for Edit/Add Dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);

  // State for Delete Alert
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [deletingAddress, setDeletingAddress] = useState<Address | undefined>(undefined);


  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setEditDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingAddress(undefined);
    setEditDialogOpen(true);
  };
  
  const handleDeleteClick = (address: Address) => {
    setDeletingAddress(address);
    setDeleteAlertOpen(true);
  }

  const confirmDelete = () => {
    if (deletingAddress) {
      removeAddress(deletingAddress.id);
      setDeleteAlertOpen(false);
      setDeletingAddress(undefined);
    }
  }

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <PageWrapper title="Meus Endereços">
      <div className="space-y-4">
        {addresses.map((address) => (
          <Card
            key={address.id}
            className={`transition-all ${
              selectedAddressId === address.id ? "border-primary shadow-lg" : ""
            }`}
          >
            <div
              className="cursor-pointer"
              onClick={() => selectAddress(address.id)}
            >
              <CardHeader className="flex flex-row items-start justify-between">
                <CardTitle className="text-lg">{address.nickname}</CardTitle>
                {/* Stop propagation to prevent card's onClick from firing */}
                <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEdit(address)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="text-destructive" 
                            onClick={() => handleDeleteClick(address)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Excluir</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {address.street}, {address.number}
                  <br />
                  {address.city}, {address.state} - {address.zip}
                  {address.complement && <><br/>{address.complement}</>}
                </p>
              </CardContent>
            </div>
          </Card>
        ))}
        
        {/* Edit/Add Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingAddress ? "Editar Endereço" : "Adicionar Novo Endereço"}
                </DialogTitle>
              </DialogHeader>
              <AddressForm address={editingAddress} onSave={handleCloseEditDialog} />
            </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso excluirá permanentemente o
                endereço "{deletingAddress?.nickname}".
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>
                Excluir
                </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      </div>

      <div className="mt-6">
        <Button className="w-full" onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Novo Endereço
        </Button>
      </div>
    </PageWrapper>
  );
};
