
import { Card, CardContent } from "@/components/ui/card";
import { LightbulbIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function InsightWidget() {
  return (
    <Card className="bg-primary/5 border-primary/10">
      <CardContent className="p-6 flex gap-4">
        <div className={cn(
          "bg-primary/10 p-2 h-fit rounded-full",
          "animate-pulse" // Pulsating animation
        )}>
          <LightbulbIcon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-primary">AI Insight</h3>
          <p className="mt-1 text-sm">
            You're <span className="font-medium">overspending</span> on Dining by <span className="font-medium">12%</span> vs. last month.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Consider setting a budget limit for this category.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
