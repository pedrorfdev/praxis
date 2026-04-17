"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CaregiverSidebarProps {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export function CaregiverSidebar({
  name,
  phone,
  email,
  address,
}: CaregiverSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm sticky top-8 transition-all">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center text-2xl font-bold text-secondary border-2 border-secondary/20 shadow-inner">
          {initials}
        </div>
        <h2 className="text-xl font-bold text-primary">{name}</h2>
      </div>

      <hr className="my-6 border-border" />

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 p-1.5 bg-secondary/5 rounded-lg text-secondary">
            <Phone className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-black tracking-widest">
              Telefone
            </span>
            <span className="text-sm font-semibold">{phone}</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 p-1.5 bg-secondary/5 rounded-lg text-secondary">
            <Mail className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase font-black tracking-widest">
              Email
            </span>
            <span className="text-sm font-semibold">{email}</span>
          </div>
        </div>

        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out overflow-hidden",
            isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0 space-y-4 border-t border-border pt-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 p-1.5 bg-secondary/5 rounded-lg text-secondary">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground uppercase font-black tracking-widest">
                  Endereço
                </span>
                <span className="text-sm font-semibold">{address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mt-6 h-9 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-secondary hover:bg-secondary/5 rounded-lg transition-all"
      >
        {isExpanded ? (
          <>
            Recolher Ficha <ChevronUp className="ml-2 h-4 w-4" />
          </>
        ) : (
          <>
            Ver Ficha Completa <ChevronDown className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
