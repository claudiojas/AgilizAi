import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Address, useAddressStore } from "@/store/addressStore";

const addressSchema = z.object({
  nickname: z.string().min(2, "Apelido muito curto"),
  street: z.string().min(3, "Rua muito curta"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  city: z.string().min(2, "Cidade muito curta"),
  state: z.string().min(2, "Estado deve ter 2 letras").max(2, "Estado deve ter 2 letras"),
  zip: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido (formato: 00000-000)"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressFormProps {
  address?: Address;
  onSave: () => void;
}

export const AddressForm = ({ address, onSave }: AddressFormProps) => {
  const { addAddress, updateAddress } = useAddressStore();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: address || {
      nickname: "",
      street: "",
      number: "",
      complement: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const onSubmit = (data: AddressFormValues) => {
    if (address) {
      updateAddress({ ...address, ...data });
    } else {
      addAddress(data);
    }
    onSave();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apelido (ex: Casa, Trabalho)</FormLabel>
              <FormControl>
                <Input placeholder="Minha Casa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder="00000-000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input placeholder="Rua das Flores" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
            <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
                <FormItem className="w-1/3">
                <FormLabel>Número</FormLabel>
                <FormControl>
                    <Input placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
                <FormItem className="flex-1">
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                    <Input placeholder="Apto 4B" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="flex gap-4">
            <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
                <FormItem className="flex-1">
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                    <Input placeholder="São Paulo" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
                <FormItem className="w-1/4">
                <FormLabel>Estado</FormLabel>
                <FormControl>
                    <Input placeholder="SP" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <Button type="submit" className="w-full">
          {address ? "Salvar Alterações" : "Adicionar Endereço"}
        </Button>
      </form>
    </Form>
  );
};
