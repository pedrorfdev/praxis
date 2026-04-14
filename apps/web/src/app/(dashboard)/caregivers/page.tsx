"use client";

import { useState } from "react";
import { 
  LayoutGrid, List, Plus, Search, MoreVertical, 
  Pencil, Eye, Phone, Loader2, Users, AlertCircle 
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const mockCaregivers = [
  {
    id: "1",
    name: "Mariana Silva",
    document: "123.456.789-00",
    kinship: "Mãe",
    phone: "(11) 98888-7777",
    patientCount: 2,
  },
  {
    id: "2",
    name: "Roberto Santos",
    document: "987.654.321-11",
    kinship: "Pai",
    phone: "(21) 95555-4444",
    patientCount: 1,
  },
  {
    id: "3",
    name: "Ana Oliveira",
    document: "111.222.333-44",
    kinship: "Tia",
    phone: "(31) 97777-6666",
    patientCount: 0,
  },
  {
    id: "4",
    name: "Dr. Marcos Paulo",
    document: "555.666.777-88",
    kinship: "Cuidador Profissional",
    phone: "(11) 91234-5678",
    patientCount: 5,
  },
];

export default function CaregiversPage() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { data: caregivers = [], isLoading } = useQuery({
    queryKey: ["caregivers"],
    queryFn: async () => {
      const response = await api.get("/caregivers");
      return response.data;
    },
  });

  const filteredCaregivers = caregivers.filter((c: any) => {
    const searchTerm = search.toLowerCase().replace(/\D/g, "");
    const normalName = c.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const inputNormal = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const matchName = normalName.includes(inputNormal);
    const matchDocument = c.document?.replace(/\D/g, "").includes(searchTerm);
    const matchPhone = c.phone?.replace(/\D/g, "").includes(searchTerm);

    return matchName || (searchTerm && (matchDocument || matchPhone));
  });

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
            Cuidadores
          </h1>
          <p className="text-zinc-500 italic">
            Gerencie os responsáveis e contatos de emergência.
          </p>
        </div>

        <Button 
          onClick={() => router.push("/caregivers/new")}
          className="rounded-2xl shadow-lg hover:scale-105 transition-all bg-secondary text-secondary-foreground px-8 h-12 font-bold"
        >
          <Plus className="w-5 h-5 mr-2" /> Novo Cuidador
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-zinc-900/50 p-3 rounded-[2rem] border border-white/5">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Busque por nome, CPF ou WhatsApp..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 bg-zinc-950 border-zinc-800 h-12 rounded-xl focus-visible:ring-secondary/50"
          />
        </div>

        <Tabs value={view} onValueChange={setView} className="w-fit">
          <TabsList className="bg-zinc-950 border border-zinc-800 p-1 h-12 rounded-xl">
            <TabsTrigger value="grid" className="rounded-lg data-[state=active]:bg-zinc-800"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
            <TabsTrigger value="list" className="rounded-lg data-[state=active]:bg-zinc-800"><List className="h-4 w-4" /></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading && (
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <Loader2 className="h-4 w-4 animate-spin text-secondary" /> 
          Sincronizando base de cuidadores...
        </div>
      )}

      <Tabs value={view} className="w-full">
        <TabsContent value="grid" className="mt-0 outline-none">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockCaregivers.map((caregiver: any) => (
              <CaregiverCard key={caregiver.id} caregiver={caregiver} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-0 outline-none">
          <CaregiverList caregivers={mockCaregivers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CaregiverCard({ caregiver }: { caregiver: any }) {
  const router = useRouter();
  const initials = caregiver.name.split(" ").filter(Boolean).map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <Card className="group border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-secondary/30 transition-all duration-300 rounded-[2rem] overflow-hidden relative border-b-4 border-b-transparent hover:border-b-secondary">
      <div className="absolute top-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-zinc-800">
              <MoreVertical className="h-4 w-4 text-zinc-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl w-48 bg-zinc-950 border-zinc-800 text-white">
            <DropdownMenuItem onClick={() => router.push(`/caregivers/${caregiver.id}`)} className="cursor-pointer">
              <Eye className="w-4 h-4 mr-2" /> Visualizar Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/caregivers/${caregiver.id}/edit`)} className="cursor-pointer">
              <Pencil className="w-4 h-4 mr-2" /> Editar Dados
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardHeader className="flex flex-col items-center text-center pt-8 pb-4">
        <Avatar className="h-20 w-20 border-4 border-zinc-800 group-hover:border-secondary/20 transition-all">
          <AvatarFallback className="bg-zinc-800 text-zinc-400 font-black text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="mt-4 space-y-1">
          <h3 className="font-bold text-white text-lg leading-tight">{caregiver.name}</h3>
          <p className="text-xs font-medium text-secondary uppercase tracking-tighter">{caregiver.kinship || "Vínculo não definido"}</p>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-8 space-y-4">
        <div className="flex flex-col gap-2 p-3 rounded-2xl bg-zinc-950/50 border border-white/5">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-zinc-600">
            <span>Contato</span>
            <span className="text-zinc-300 normal-case tracking-normal">{caregiver.phone}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2">
           {caregiver.patientCount > 0 ? (
             <Badge variant="outline" className="rounded-full bg-secondary/5 border-secondary/20 text-secondary text-[10px] py-1 px-3">
               <Users className="h-3 w-3 mr-1" /> {caregiver.patientCount} Pacientes
             </Badge>
           ) : (
             <Badge variant="outline" className="rounded-full bg-zinc-800 border-zinc-700 text-zinc-500 text-[10px] py-1 px-3">
               <AlertCircle className="h-3 w-3 mr-1" /> Sem Vínculo
             </Badge>
           )}
        </div>
      </CardContent>
    </Card>
  );
}

function CaregiverList({ caregivers }: { caregivers: any[] }) {
  const router = useRouter();

  return (
    <div className="rounded-xl border border-border/40 bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-secondary/5">
          <TableRow className="hover:bg-transparent border-border/40">
            <TableHead className="font-bold text-primary">Cuidador</TableHead>
            <TableHead className="font-bold text-primary text-center">Parentesco</TableHead>
            <TableHead className="font-bold text-primary text-center">Telefone</TableHead>
            <TableHead className="text-right font-bold text-primary px-6">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {caregivers.map((c) => (
            <TableRow key={c.id} className="group border-border/40 hover:bg-secondary/5 transition-colors cursor-pointer" onClick={() => router.push(`/caregivers/${c.id}`)}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-[10px] font-bold text-secondary">
                    {c.name.split(" ").map((n:any)=>n[0]).join("")}
                  </div>
                  <span className="font-semibold text-sm">{c.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-center italic text-xs text-muted-foreground">{c.kinship}</TableCell>
              <TableCell className="text-center text-xs text-muted-foreground">{c.phone}</TableCell>
              <TableCell className="text-right px-6">
                <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}