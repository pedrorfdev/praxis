"use client";

import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { name: "Autismo (TEA)", value: 40, fill: "var(--chart-1)" },
  { name: "TDAH", value: 30, fill: "var(--chart-2)" },
  { name: "Motricidade", value: 20, fill: "var(--chart-3)" },
  { name: "Outros", value: 10, fill: "var(--chart-4)" },
];

export function SpecialtyChart() {
  return (
    <Card className="flex flex-col border-border/50">
      <CardHeader className="items-center pb-0">
        <CardTitle>Perfil de Atendimento</CardTitle>
        <CardDescription>Distribuição por diagnóstico</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={8}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.fill}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--border)",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "var(--foreground)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 py-4 text-xs">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-1">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
