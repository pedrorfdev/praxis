import { FileCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function Goal() {
  return (
    <Card className="border-border/50 bg-secondary/5">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="rounded-full bg-secondary/20 p-2">
          <FileCheck className="h-5 w-5 text-secondary" />
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-sm font-medium">
            Meta de Documentação
          </CardTitle>
          <CardDescription className="text-xs">
            Evoluções desta semana
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-2">
          <span className="text-2xl font-bold">85%</span>
          <span className="text-xs font-medium text-muted-foreground">
            17/20 concluídas
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-secondary/20">
          <div
            className="h-2 rounded-full bg-secondary transition-all duration-500"
            style={{ width: "85%" }}
          />
        </div>
        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          Excelente ritmo! Você está quase liberando o final de semana sem
          pendências administrativas.
        </p>
      </CardContent>
    </Card>
  );
}
