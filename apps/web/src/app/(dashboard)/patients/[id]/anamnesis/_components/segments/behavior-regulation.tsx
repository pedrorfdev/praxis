"use client";
import { useFormContext } from "react-hook-form";

export function BehaviorRegulation() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/70 ml-1">Crises comportamentais</label>
          <textarea 
            {...register("behavior.crises_description")} 
            placeholder="Frequência, intensidade, como ocorrem..." 
            className="w-full min-h-[100px] bg-[#0A0C10]/40 border border-white/5 rounded-2xl p-4 text-zinc-200 outline-none focus:border-secondary/40 transition-all"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/70 ml-1">Gatilhos identificados</label>
          <input 
            {...register("behavior.triggers")} 
            placeholder="Ex: Mudança de rotina, barulhos, frustração..." 
            className="w-full bg-[#0A0C10]/40 border border-white/5 rounded-2xl p-4 text-zinc-200 outline-none focus:border-secondary/40"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/70 ml-1">Estratégias que acalmam</label>
          <textarea 
            {...register("behavior.calming_strategies")} 
            placeholder="O que ajuda a regular a criança no momento da crise?" 
            className="w-full bg-[#0A0C10]/40 border border-white/5 rounded-2xl p-4 text-zinc-200 outline-none focus:border-secondary/40"
          />
        </div>
      </div>
    </div>
  );
}