"use client";
import { useFormContext } from "react-hook-form";

export function DailyRoutine() {
  const { register } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {[
          { id: "sleep", label: "Sono", placeholder: "Dorme bem? Acorda à noite? Horários?" },
          { id: "food", label: "Alimentação", placeholder: "Seletividade, mastigação, autonomia..." },
          { id: "hygiene", label: "Higiene / Autocuidado", placeholder: "Fraldas, banho, escovação..." },
          { id: "leisure", label: "Brincar e Lazer", placeholder: "Brinca sozinho? Interage com brinquedos?" },
        ].map((item) => (
          <div key={item.id} className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-secondary/70">{item.label}</label>
            <textarea
              {...register(`routine.${item.id}`)}
              placeholder={item.placeholder}
              className="w-full min-h-[80px] bg-[#0A0C10]/40 border border-white/5 rounded-2xl p-4 text-zinc-200 outline-none focus:border-secondary/40 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}