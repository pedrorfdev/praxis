"use client";

import { useFormContext } from "react-hook-form";
import { useAnamnesis } from "../anamnesis-provider";

export function GestationalHistory() {
  const { register } = useFormContext();
  const { isLocked } = useAnamnesis();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-primary tracking-tight">
          Histórico Gestacional
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          Informações sobre a gestação, pré-natal e intercorrências.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.15em] text-secondary/70 ml-1">
            Idade da mãe na gestação
          </label>
          <input
            {...register("gestational.mother_age")}
            disabled={isLocked}
            type="number"
            placeholder="Ex: 28"
            className="w-full bg-[#0A0C10]/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 text-zinc-200 outline-none focus:border-secondary/40 transition-all"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.15em] text-secondary/70 ml-1">
            Gravidez planejada?
          </label>
          <select
            {...register("gestational.planned")}
            disabled={isLocked}
            className="w-full bg-[#0A0C10]/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 text-zinc-200 outline-none focus:border-secondary/40 transition-all appearance-none"
          >
            <option value="sim" className="bg-[#0A0C10]">
              Sim
            </option>
            <option value="nao" className="bg-[#0A0C10]">
              Não
            </option>
          </select>
        </div>

        <div className="space-y-3 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-[0.15em] text-secondary/70 ml-1">
            Intercorrências ou doenças na gestação
          </label>
          <textarea
            {...register("gestational.complications")}
            disabled={isLocked}
            placeholder="Ex: Diabetes gestacional, hipertensão, viroses..."
            className="w-full min-h-[120px] bg-[#0A0C10]/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 text-zinc-200 placeholder:text-muted-foreground/30 outline-none focus:border-secondary/40 transition-all leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
