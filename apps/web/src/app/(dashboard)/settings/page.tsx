"use client"

import { User, Building, Shield, Mail, Lock, KeyRound, MapPin, Hash, ClipboardList } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function ConfigPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl animate-in fade-in duration-700">
      <div className="space-y-1">
        <h1 className="text-4xl font-black tracking-tighter text-white">
          Configurações
        </h1>
        <p className="text-zinc-500 italic text-sm">
          Gerencie sua identidade profissional e os dados da sua clínica.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-zinc-900/50 border border-white/5 p-1 mb-10 h-14 rounded-2xl w-full sm:w-fit backdrop-blur-sm">
          <TabsTrigger value="profile" className="gap-2 rounded-xl px-8 h-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground font-bold transition-all">
            <User className="h-4 w-4" /> Perfil
          </TabsTrigger>
          <TabsTrigger value="clinic" className="gap-2 rounded-xl px-8 h-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground font-bold transition-all">
            <Building className="h-4 w-4" /> Clínica
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 rounded-xl px-8 h-full data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground font-bold transition-all">
            <Shield className="h-4 w-4" /> Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 animate-in slide-in-from-bottom-2 duration-400 outline-none">
          <div className="rounded-[40px] border border-white/5 bg-zinc-900/30 p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-64 w-64 bg-secondary/5 blur-[100px] -z-10" />
            
            <div className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Nome Profissional</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                    <Input defaultValue="Pedro Ferreira" className="rounded-2xl border-white/5 bg-zinc-950/50 focus-visible:ring-secondary/30 h-14 pl-12 text-white font-medium" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Registro (CRP/CREFITO)</label>
                  <div className="relative">
                    <ClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                    <Input placeholder="00/00000" className="rounded-2xl border-white/5 bg-zinc-950/50 focus-visible:ring-secondary/30 h-14 pl-12 text-white" />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">E-mail de Acesso</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                    <Input defaultValue="pedro@praxis.com" className="rounded-2xl border-white/5 bg-zinc-950/50 h-14 pl-12 text-white/50 cursor-not-allowed" disabled />
                  </div>
                  <p className="text-[10px] text-zinc-600 italic ml-1">* O e-mail não pode ser alterado diretamente por questões de segurança.</p>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-secondary text-secondary-foreground hover:scale-105 rounded-2xl px-12 h-14 font-black shadow-lg shadow-secondary/10 transition-all active:scale-95">
                  Salvar Alterações
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clinic" className="space-y-6 animate-in slide-in-from-bottom-2 duration-400 outline-none">
          <div className="rounded-[40px] border border-white/5 bg-zinc-900/30 p-8 md:p-12 space-y-10">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Nome da Clínica / Consultório</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                  <Input placeholder="Ex: Praxis Terapia Ocupacional" className="rounded-2xl border-white/5 bg-zinc-950/50 h-14 pl-12 text-white font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">CNPJ (Opcional)</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                  <Input placeholder="00.000.000/0000-00" className="rounded-2xl border-white/5 bg-zinc-950/50 h-14 pl-12 text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Cidade / UF</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                  <Input placeholder="São Paulo - SP" className="rounded-2xl border-white/5 bg-zinc-950/50 h-14 pl-12 text-white" />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Endereço Completo</label>
                <Input placeholder="Rua, Número, Complemento, Bairro" className="rounded-2xl border-white/5 bg-zinc-950/50 h-14 px-6 text-white font-medium" />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button className="bg-secondary text-secondary-foreground hover:scale-105 rounded-2xl px-12 h-14 font-black shadow-lg shadow-secondary/10 transition-all active:scale-95">
                Atualizar Dados da Clínica
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 animate-in slide-in-from-bottom-2 duration-400 outline-none">
          <div className="rounded-[40px] border border-white/5 bg-zinc-900/30 p-8 md:p-12 max-w-2xl">
            <div className="space-y-8">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 italic">
                  <KeyRound className="h-5 w-5 text-secondary" /> Alterar Senha
                </h3>
                <p className="text-zinc-500 text-xs">Recomendamos uma senha forte com pelo menos 8 caracteres.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Senha Atual</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                    <Input type="password" placeholder="••••••••" className="rounded-2xl border-white/5 bg-zinc-950/50 h-14 pl-12 text-white" />
                  </div>
                </div>

                <Separator className="bg-white/5" />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Nova Senha</label>
                    <Input type="password" placeholder="••••••••" className="rounded-2xl border-white/5 bg-zinc-950/50 h-14 px-6 text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Confirmar Nova Senha</label>
                    <Input type="password" placeholder="••••••••" className="rounded-2xl border-white/5 bg-zinc-950/50 h-14 px-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-secondary text-secondary-foreground hover:scale-105 rounded-2xl px-12 h-14 font-black shadow-lg shadow-secondary/10 transition-all active:scale-95">
                  Redefinir Senha
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}