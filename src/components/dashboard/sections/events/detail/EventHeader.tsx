
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Share } from "lucide-react";

interface EventHeaderProps {
  onBack: () => void;
  onEdit: () => void;
}

export function EventHeader({ onBack, onEdit }: EventHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" onClick={onBack} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Kembali
      </Button>
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2">
          <Share className="h-4 w-4" /> Bagikan
        </Button>
        <Button onClick={onEdit} className="gap-2">
          <Edit className="h-4 w-4" /> Edit Event
        </Button>
      </div>
    </div>
  );
}
