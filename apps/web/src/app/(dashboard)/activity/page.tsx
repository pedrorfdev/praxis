"use client";

import { useState } from "react";
import { format, isYesterday, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { History, Search, ChevronRight, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockActivities = [
  { id: "1", patientName: "Ana Clara Silva", date: "2026-04-13T14:30:00" },
  { id: "2", patientName: "João Pedro Santos", date: "2026-04-13T10:00:00" },
  { id: "3", patientName: "Beatriz Oliveira", date: "2026-04-12T16:00:00" },
  { id: "4", patientName: "Ricardo Menezes", date: "2026-04-11T09:00:00" },
];

export default function ActivityPage() {
  const [search, setSearch] = useState("");

  const normalizeString = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredActivities = mockActivities.filter((activity) =>
    normalizeString(activity.patientName).includes(normalizeString(search))
  );

  const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Hoje";
    if (isYesterday(date)) return "Ontem";
    return format(date, "dd 'de' MMMM", { locale: ptBR });
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 w-full mx-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
          <History className="h-6 w-6" />
          Atividade Recente
        </h2>
        <p className="text-zinc-500 text-sm">
          Histórico cronológico de todos os atendimentos realizados.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <Input
          placeholder="Buscar paciente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card border-border/40 focus:ring-secondary/20 h-11 rounded-xl"
        />
      </div>

      <div className="space-y-3">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="group flex items-center justify-between p-4 rounded-2xl bg-card/50 border border-border/20 hover:border-secondary/30 hover:bg-card transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-secondary/5 flex items-center justify-center border border-secondary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-500 group-hover:text-primary/40 transition-colors">
                    {activity.patientName}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                    {formatDateLabel(activity.date)}
                  </span>
                </div>
              </div>
              
              <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
            </div>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-border/20 rounded-3xl">
            <p className="text-zinc-500 text-sm italic">Nenhuma atividade encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}