
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface EventActionsProps {
  onViewRegistrations: () => void;
}

export function EventActions({ onViewRegistrations }: EventActionsProps) {
  return (
    <div className="flex gap-2">
      <Button className="gap-2">
        <Mail className="h-4 w-4" /> Kirim Email ke Pendaftar
      </Button>
      <Button variant="outline" onClick={onViewRegistrations}>
        Lihat Pendaftar
      </Button>
    </div>
  );
}
