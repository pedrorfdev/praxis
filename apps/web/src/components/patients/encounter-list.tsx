"use client";

import { MoreVertical, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockEncounters = [
  {
    id: "1",
    date: "21 Março, 2026",
    duration: "50min",
    content: "Paciente apresentou boa regulação sensorial hoje. Trabalhamos atividades de motricidade fina com foco em pinça. Demonstrou resistência inicial, mas finalizou a tarefa com suporte verbal."
  }
];

export function EncounterList() {
  if (mockEncounters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-secondary/5 rounded-[2rem] border-2 border-dashed border-secondary/20">
        <div className="h-20 w-20 bg-background rounded-3xl flex items-center justify-center shadow-xl mb-6 rotate-3">
          <FileText className="h-10 w-10 text-secondary/40" />
        </div>
        <h4 className="text-xl font-bold text-primary">Nenhuma sessão registrada</h4>
        <p className="text-sm text-muted-foreground max-w-[320px] text-center mt-2 mb-8 font-medium">
          O prontuário deste paciente está vazio. Inicie a primeira evolução clínica agora.
        </p>
      </div>
    );
  }

  return (
      <div className="relative pl-8 sm:pl-12 space-y-10">
        <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-secondary/50 via-secondary/20 to-transparent shadow-[0_0_10px_rgba(var(--secondary),0.2)]" />
  
        <div className="space-y-12">
          {mockEncounters.map((encounter) => (
            <div 
              key={encounter.id} 
              className="relative group animate-in slide-in-from-left-4 duration-500"
            >
              <div className="absolute left-[-17px] sm:left-[-25px] top-7 -translate-x-1/2 flex items-center justify-center">
                <div className="absolute h-8 w-8 rounded-full bg-secondary/5 group-hover:bg-secondary/15 transition-all duration-500 blur-sm" />
                
                <div className="relative h-5 w-5 rounded-full border-2 border-secondary/40 bg-background flex items-center justify-center group-hover:border-secondary transition-colors duration-300">
                  <div className="h-2 w-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary),0.6)] group-hover:scale-110 transition-transform" />
                </div>
              </div>
  
              <div className="bg-[#0A0C10]/60 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl hover:border-secondary/30 transition-all duration-500 group/card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-secondary bg-secondary/10 px-3 py-1 rounded-full uppercase tracking-[0.2em] border border-secondary/20 w-fit">
                      {encounter.date}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-medium italic mt-1 ml-1">
                      Duração: {encounter.duration}
                    </span>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl shrink-0 hover:bg-secondary/10 hover:text-secondary text-muted-foreground  transition-all">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
  
                <p className="text-[15px] sm:text-[16px] text-zinc-200 leading-relaxed font-medium tracking-tight">
                  {encounter.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}