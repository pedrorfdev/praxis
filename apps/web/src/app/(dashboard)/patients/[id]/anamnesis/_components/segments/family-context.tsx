"use client";
import { useFormContext } from "react-hook-form";
import { useAnamnesis } from "../anamnesis-provider";

export function FamilyContext() {
  const { register } = useFormContext();
  const { isLocked } = useAnamnesis();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/70 ml-1">
            Composição Familiar
          </label>
          <textarea
            {...register("family.composition")}
            disabled={isLocked}
            placeholder="Quem mora com a criança? Nomes e parentesco..."
            className="w-full bg-[#0A0C10]/40 border border-white/5 rounded-2xl p-4 text-zinc-200 outline-none focus:border-secondary/40"
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/70 ml-1">
            Rede de Apoio
          </label>
          <textarea
            {...register("family.support_network")}
            disabled={isLocked}
            placeholder="Possui ajuda de avós, babás, escola? Quem ajuda no cuidado diário?"
            className="w-full bg-[#0A0C10]/40 border border-white/5 rounded-2xl p-4 text-zinc-200 outline-none focus:border-secondary/40"
          />
        </div>
      </div>
    </div>
  );
}
