"use client";

import { useState } from "react";
import { 
  Clock, 
  Calendar as CalendarIcon, 
  MoreVertical, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Phone,
  User,
  CreditCard,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock inicial para testar o Empty State (mude para [] para ver o empty state)
const mockSessions: any[] = [
  {
    id: "1",
    date: "21 Março, 2026",
    duration: "50min",
    content: "Paciente apresentou boa regulação sensorial hoje. Trabalhamos atividades de motricidade fina com foco em pinça. Demonstrou resistência inicial, mas finalizou a tarefa com suporte verbal."
  }
];

export default function PatientDetailsPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const sessions = mockSessions; // Aqui virá o data da sua API futuramente

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-in fade-in duration-500">
      
      {/* Sidebar: Informações do Paciente */}
      <aside className="md:col-span-4 lg:col-span-3">
        <div className="rounded-2xl border border-border/40 bg-card p-6 shadow-sm sticky top-8 transition-all">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center text-2xl font-bold text-secondary border-2 border-secondary/20 shadow-inner">
              JS
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary">João Silva</h2>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold bg-muted/30 px-2 py-0.5 rounded">
                Diagnóstico: TEA
              </span>
            </div>
          </div>

          <hr className="my-6 border-border/40" />

          {/* Dados Visíveis Sempre */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1.5 bg-secondary/5 rounded-lg text-secondary">
                <User className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Responsável</span>
                <span className="text-sm font-medium">Maria Silva (Mãe)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 p-1.5 bg-secondary/5 rounded-lg text-secondary">
                <Phone className="h-3.5 w-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Contato</span>
                <span className="text-sm font-medium">(51) 99887-6655</span>
              </div>
            </div>

            {/* Dados Expansíveis */}
            <div className={cn(
              "grid transition-all duration-300 ease-in-out overflow-hidden",
              isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            )}>
              <div className="min-h-0 space-y-4 border-t border-border/20 pt-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-secondary/5 rounded-lg text-secondary">
                    <CalendarIcon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Nascimento/Idade</span>
                    <span className="text-sm font-medium">31/03/2018 (8 anos)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-secondary/5 rounded-lg text-secondary">
                    <CreditCard className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">CPF</span>
                    <span className="text-sm font-medium">123.456.789-00</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-secondary/5 rounded-lg text-secondary">
                    <Briefcase className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Profissão</span>
                    <span className="text-sm font-medium">Estudante</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-secondary/5 rounded-lg text-secondary">
                    <GraduationCap className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Escolaridade</span>
                    <span className="text-sm font-medium">Ensino Fundamental I</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button 
            variant="ghost" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4 h-8 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-secondary hover:bg-secondary/5 rounded-xl transition-colors"
          >
            {isExpanded ? (
              <>Ocultar detalhes <ChevronUp className="ml-2 h-3.5 w-3.5" /></>
            ) : (
              <>Ver ficha completa <ChevronDown className="ml-2 h-3.5 w-3.5" /></>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content: Prontuário */}
      <main className="md:col-span-8 lg:col-span-9 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/5 rounded-xl">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-primary">Histórico de Evoluções</h3>
          </div>
          <button className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all">
            + Nova Sessão
          </button>
        </div>

        {/* Lógica de Renderização Condicional (Empty State vs Timeline) */}
        {sessions.length > 0 ? (
          <div className="relative pl-8 border-l-2 border-secondary/20 space-y-8 ml-4">
            {sessions.map((session, i) => (
              <div key={session.id} className="relative group">
                <div className="absolute -left-[41px] top-8 h-4 w-4 rounded-full bg-secondary border-4 border-background group-hover:scale-125 transition-transform" />
                
                <div className="bg-card border border-border/40 rounded-2xl p-6 shadow-sm hover:border-secondary/40 transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-secondary bg-secondary/10 px-2 py-1 rounded">
                        {session.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-muted-foreground font-medium italic">Duração: {session.duration}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    {session.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-secondary/5 rounded-3xl border-2 border-dashed border-border/40">
            <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center shadow-sm mb-4">
              <FileText className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <h4 className="text-lg font-bold text-primary">Nenhuma sessão registrada</h4>
            <p className="text-sm text-muted-foreground max-w-[280px] text-center mt-1 mb-6">
              Comece a documentar as evoluções clínicas deste paciente para acompanhar seu progresso.
            </p>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8">
              Iniciar Primeira Sessão
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}