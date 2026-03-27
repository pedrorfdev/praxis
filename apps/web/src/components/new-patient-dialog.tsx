"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NewPatientDialog() {
  const [open, setOpen] = useState(false)

  const handleSave = () => {
    setOpen(false)
    toast.success("Paciente cadastrado", {
      description: "João Silva foi adicionado à sua base de pacientes.",
      action: {
        label: "Ver Prontuário",
        onClick: () => console.log("Abrir prontuário"),
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl shadow-md transition-all active:scale-95">
          <Plus className="h-4 w-4" />
          Novo Paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-border/50 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">Cadastrar Paciente</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Adicione as informações básicas para iniciar o acompanhamento.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-sm font-semibold">Nome Completo</Label>
            <Input id="name" placeholder="Ex: João Silva" className="rounded-lg border-border/60 focus:border-secondary focus:ring-secondary/20" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type" className="text-sm font-semibold">Diagnóstico Principal</Label>
            <Input id="type" placeholder="Ex: TEA, TDAH..." className="rounded-lg border-border/60 focus:border-secondary focus:ring-secondary/20" />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-lg">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg px-8">
            Salvar Paciente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}