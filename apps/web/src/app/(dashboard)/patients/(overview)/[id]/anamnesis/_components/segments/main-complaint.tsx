"use client";

import { useFormContext } from "react-hook-form";
import { useAnamnesis } from "../anamnesis-provider";

export function MainComplaint() {
  const { register } = useFormContext();
  const { isLocked } = useAnamnesis();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-primary tracking-tight">
          Queixa Principal
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          Relate o motivo da busca pelo atendimento e as principais preocupações.
        </p>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-black uppercase tracking-widest text-secondary/70 ml-1">
          Relato do Responsável
        </label>
        
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/20 to-transparent rounded-[2rem] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
          
          <textarea
            {...register("main_complaint.description")}
            disabled={isLocked}
            placeholder="Ex: Dificuldade na fala, seletividade alimentar, atraso motor..."
            className="relative w-full min-h-[250px] bg-[#0A0C10]/60 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 text-zinc-200 placeholder:text-muted-foreground/30 outline-none focus:border-secondary/40 transition-all leading-relaxed antialiased"
          />
        </div>
      </div>
    </div>
  );
}