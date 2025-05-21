
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function QuickActionCard({ title, description, icon: Icon, onClick }: QuickActionCardProps) {
  return (
    <Card 
      className="hover-card cursor-pointer card-gradient border-primary/10"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="bg-primary/10 p-2 w-fit rounded-md mb-4">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
