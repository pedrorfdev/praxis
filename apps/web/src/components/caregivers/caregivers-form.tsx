"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, Heart, UserPlus } from "lucide-react";
import { useEffect } from "react";

interface CaregiverFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function CaregiverForm({
  initialData,
  onSubmit,
  isLoading,
}: CaregiverFormProps) {
  const isEdit = !!initialData?.id;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-card/40 border border-border/40 p-8 rounded-[2.5rem] shadow-2xl"
    >
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          {isEdit ? (
            <Heart className="h-6 w-6 text-secondary" />
          ) : (
            <UserPlus className="h-6 w-6 text-secondary" />
          )}
          {isEdit ? "Editar Cuidador" : "Novo Cuidador"}
        </h2>
        <p className="text-zinc-500 text-sm italic">
          {isEdit
            ? "Atualize as informações de contato."
            : "Cadastre um novo responsável para o paciente."}
        </p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">
            Nome Completo
          </Label>
          <Input
            {...register("name")}
            placeholder="Ex: Mariana Silva"
            className="bg-background/50 border-border/40 h-12 rounded-2xl focus:ring-secondary/20 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">
              Telefone / WhatsApp
            </Label>
            <Input
              {...register("phone")}
              placeholder="(00) 00000-0000"
              className="bg-background/50 border-border/40 h-12 rounded-2xl focus:ring-secondary/20"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">
              Parentesco / Vínculo
            </Label>
            <Input
              {...register("kinship")}
              placeholder="Ex: Mãe, Pai, Tutor"
              className="bg-background/50 border-border/40 h-12 rounded-2xl focus:ring-secondary/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">
            E-mail de Contato
          </Label>
          <Input
            {...register("email")}
            type="email"
            placeholder="email@exemplo.com"
            className="bg-background/50 border-border/40 h-12 rounded-2xl focus:ring-secondary/20"
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-14 rounded-2xl font-black text-lg shadow-lg shadow-secondary/10 transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Save className="mr-2 h-5 w-5" />
          )}
          {isEdit ? "Salvar Alterações" : "Finalizar Cadastro"}
        </Button>
      </div>
    </form>
  );
}
