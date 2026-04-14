"use client";

import { CaregiverForm } from "@/components/caregivers/caregivers-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditCaregiverPage({ params }: { params: { id: string } }) {

  const mockData = {
    name: "Mariana Silva",
    kinship: "Mãe",
    phone: "(11) 98888-7777",
    email: "mariana@email.com"
  };

  const handleUpdate = (data: any) => {
    console.log("Atualizando cuidador", params.id, data);
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 max-w-2xl mx-auto animate-in fade-in duration-500">
      <Link 
        href={`/caregivers/${params.id}`} 
        className="flex items-center gap-2 text-zinc-500 hover:text-secondary transition-colors text-sm font-bold"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <CaregiverForm initialData={mockData} onSubmit={handleUpdate} />
    </div>
  );
}