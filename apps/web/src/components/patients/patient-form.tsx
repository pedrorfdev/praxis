"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";
import { Check, CalendarIcon, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { createPatientSchema } from "@praxis/core/domain";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface PatientFormProps {
  initialData?: any;
  isEditing?: boolean;
  isLoading?: boolean;
  onSubmit: (data: any) => void;
}

export function PatientForm({ initialData, isEditing }: PatientFormProps) {
  const router = useRouter();

  const { control, handleSubmit, watch, formState: { errors } } = useForm<any>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: initialData || {
      type: "ADULT",
      fullName: "",
      gender: "Masculino",
      maritalStatus: "Solteiro(a)",
      educationLevel: "Ensino Médio",
      religion: "Nenhuma",
    },
  });

  const patientType = watch("type");

  const onSubmit = async (data: any) => {
    try {
      console.log("Submit Data:", data);
      toast.success(isEditing ? "Paciente atualizado!" : "Paciente cadastrado!");
      router.push("/patients");
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <Button type="submit" className="bg-secondary text-secondary-foreground px-8 rounded-full font-bold hover:scale-105 transition-all">
          <Check className="w-4 h-4 mr-2" /> {isEditing ? "Salvar Alterações" : "Concluir Cadastro"}
        </Button>
      </div>

      <div className="bg-card border border-border/40 rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border/40 bg-muted/5">
          <h2 className="text-2xl font-bold text-primary">Informações do Paciente</h2>
          <p className="text-muted-foreground text-sm">Preencha os dados básicos para o prontuário.</p>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-4">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Tipo de Perfil</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Tabs onValueChange={field.onChange} value={field.value} className="w-full max-w-md">
                  <TabsList className="grid grid-cols-2 bg-muted/50">
                    <TabsTrigger value="ADULT">Adulto</TabsTrigger>
                    <TabsTrigger value="CHILD">Criança / Adolescente</TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">Nome Completo</Label>
              <Controller
                control={control}
                name="fullName"
                render={({ field }) => <Input className="bg-muted/10 border-none h-12" {...field} />}
              />
              {errors.fullName && <span className="text-xs text-destructive">{errors.fullName.message as string}</span>}
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">CPF</Label>
              <Controller
                control={control}
                name="cpf"
                render={({ field }) => (
                  <PatternFormat
                    format="###.###.###-##"
                    mask="_"
                    customInput={Input}
                    className="bg-muted/10 border-none h-12"
                    onValueChange={(v) => field.onChange(v.value)}
                    value={field.value}
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">Data de Nascimento</Label>
              <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left bg-muted/10 border-none h-12 rounded-xl", !field.value && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(new Date(field.value), "PPP", { locale: ptBR }) : "Selecione"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={field.value ? new Date(field.value) : undefined} onSelect={(date) => field.onChange(date?.toISOString())} locale={ptBR} />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">Gênero</Label>
              <Controller control={control} name="gender" render={({ field }) => <Input className="bg-muted/10 border-none h-12" {...field} />} />
            </div>
          </div>

          <div className="pt-4 border-t border-border/40">
            <h3 className="text-lg font-bold text-primary mb-6">Localização e Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-2">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Endereço</Label>
                <Controller control={control} name="address" render={({ field }) => <Input className="bg-muted/10 border-none h-12" {...field} />} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-muted-foreground">Cidade</Label>
                <Controller control={control} name="city" render={({ field }) => <Input className="bg-muted/10 border-none h-12" {...field} />} />
              </div>
            </div>
          </div>

          {patientType === "CHILD" && (
            <div className="p-6 rounded-2xl bg-secondary/5 border border-secondary/10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-secondary font-bold">Responsável Legal</Label>
                <Controller control={control} name="responsibleName" render={({ field }) => <Input className="bg-background border-none h-12 shadow-sm" {...field} />} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest text-secondary font-bold">Contato Responsável</Label>
                <Controller control={control} name="responsiblePhone" render={({ field }) => (
                  <PatternFormat format="(##) #####-####" mask="_" customInput={Input} className="bg-background border-none h-12 shadow-sm" onValueChange={(v) => field.onChange(v.value)} value={field.value} />
                )} />
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}