"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const patientsMock = [
  { id: "p3", name: "Lucas Ferreira", diagnosis: "TDAH" },
  { id: "p4", name: "Beatriz Souza", diagnosis: "TEA" },
  { id: "p5", name: "Gabriel Lima", diagnosis: "TOD" },
];

export function LinkPatientDialog() {
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("");

  const handleLink = () => {
    if (!selectedId) return;
    console.log("Vinculando paciente ID:", selectedId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl border-dashed border-2 gap-2 hover:bg-secondary/5 cursor-pointer">
          <UserPlus className="h-4 w-4" /> Vincular Paciente
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-white">Vincular Paciente</DialogTitle>
          <DialogDescription className="text-zinc-500 italic">
            Busque pelo nome do paciente para associá-lo a este cuidador.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Command className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <CommandInput placeholder="Buscar paciente..." />
            <CommandList>
              <CommandEmpty>Nenhum paciente encontrado.</CommandEmpty>
              <CommandGroup>
                {patientsMock.map((patient) => (
                  <CommandItem
                    key={patient.id}
                    value={patient.name}
                    onSelect={() => setSelectedId(patient.id)}
                    className="flex items-center justify-between p-3 cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-zinc-200">{patient.name}</span>
                      <span className="text-xs text-zinc-500">{patient.diagnosis}</span>
                    </div>
                    <Check
                      className={cn(
                        "h-4 w-4 text-secondary",
                        selectedId === patient.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-xl">
            Cancelar
          </Button>
          <Button 
            onClick={handleLink} 
            disabled={!selectedId}
            className="bg-secondary text-secondary-foreground font-bold px-6 rounded-xl hover:scale-105 transition-all"
          >
            Confirmar Vínculo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}