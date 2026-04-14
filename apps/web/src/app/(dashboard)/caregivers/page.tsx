"use client";

import { useState } from "react";
import {
  LayoutGrid,
  List,
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  Phone,
  Loader2,
  Heart,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

const mockCaregivers = [
  {
    id: "1",
    name: "Mariana Silva",
    kinship: "Mãe",
    phone: "(11) 98888-7777",
    patientCount: 2,
  },
  {
    id: "2",
    name: "Roberto Santos",
    kinship: "Pai",
    phone: "(11) 95555-4444",
    patientCount: 1,
  },
];

export default function CaregiversPage() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const router = useRouter();

  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const filteredCaregivers = mockCaregivers.filter((c) =>
    normalize(c.name).includes(normalize(search))
  );

  const { isLoading } = useQuery({
    queryKey: ["caregivers"],
    queryFn: async () => {
      const response = await api.get("/caregivers");
      return response.data;
    },
    enabled: true,
  });

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            Cuidados & Responsáveis
          </h1>
          <p className="text-muted-foreground">
            Gerencie os contatos e vínculos familiares dos seus pacientes.
          </p>
        </div>

        <Button 
          onClick={() => router.push("/caregivers/new")}
          className="rounded-full shadow-lg hover:scale-105 transition-all bg-primary text-primary-foreground px-6"
        >
          <Plus className="w-4 h-4 mr-2" /> Novo Cuidador
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-secondary/5 p-2 rounded-2xl border border-border/40">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar cuidador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-background border-none shadow-none focus-visible:ring-1 focus-visible:ring-secondary/50"
          />
        </div>

        <Tabs value={view} onValueChange={setView} className="w-fit">
          <TabsList className="bg-background border border-border/50">
            <TabsTrigger value="grid" className="gap-2">
              <LayoutGrid className="h-4 w-4" /> Cards
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" /> Lista
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
          <Loader2 className="h-3 w-3 animate-spin" /> Sincronizando cuidadores...
        </div>
      )}

      <Tabs value={view} className="w-full">
        <TabsContent value="grid" className="mt-0 outline-none">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCaregivers.map((caregiver) => (
              <CaregiverCard key={caregiver.id} caregiver={caregiver} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-0 outline-none">
          <CaregiverList caregivers={filteredCaregivers} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CaregiverCard({ caregiver }: { caregiver: any }) {
  const router = useRouter();
  const initials = caregiver.name.split(" ").map((n: any) => n[0]).join("");

  return (
    <Card
      onClick={() => router.push(`/caregivers/${caregiver.id}`)}
      className="group border border-border/40 bg-card hover:border-secondary/50 transition-all duration-300 cursor-pointer overflow-hidden relative"
    >
      <div className="absolute top-4 right-2 z-10" onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl w-40">
            <DropdownMenuItem onClick={() => router.push(`/caregivers/${caregiver.id}`)}>
              <Eye className="w-4 h-4 mr-2" /> Detalhes
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pencil className="w-4 h-4 mr-2" /> Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <Avatar className="h-12 w-12 border-2 border-secondary/20">
          <AvatarFallback className="bg-secondary/10 text-secondary font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col pr-6">
          <h3 className="font-bold text-primary truncate max-w-[140px]">{caregiver.name}</h3>
          <span className="text-xs text-muted-foreground">{caregiver.kinship}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> Contato</span>
          <span className="font-medium text-foreground">{caregiver.phone}</span>
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="secondary" className="rounded-md text-[10px] uppercase tracking-wider gap-1">
             <Users className="h-3 w-3" /> {caregiver.patientCount} Pacientes
           </Badge>
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