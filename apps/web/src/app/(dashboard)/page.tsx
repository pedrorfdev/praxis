import { Goal } from "@/components/goals";
import { MetricsGrid } from "@/components/metrics-grid";
import { SpecialtyChart } from "@/components/specialty-chart";
import { UpcomingSessions } from "@/components/upcoming-sessions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
        <p className="text-muted-foreground font-medium italic">"A terapia é o caminho para a autonomia."</p>
      </div>

      <MetricsGrid />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        <div className="col-span-4 space-y-6">
          <SpecialtyChart />
          
          <Goal />
        </div>

        <Card className="col-span-3 border-border/50">
          <CardHeader>
            <CardTitle>Agenda de Hoje</CardTitle>
            <CardDescription>Visualização rápida dos seus próximos horários.</CardDescription>
          </CardHeader>
          <CardContent>
            <UpcomingSessions />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}