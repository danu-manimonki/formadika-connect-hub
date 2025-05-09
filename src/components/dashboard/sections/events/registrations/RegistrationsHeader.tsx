
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Plus } from "lucide-react";

interface RegistrationsHeaderProps {
  registrationCount: number;
  filteredCount: number;
  maxParticipants?: number;
  onOpenAddForm: () => void;
  onExportCSV: () => void;
}

export function RegistrationsHeader({
  registrationCount,
  filteredCount, 
  maxParticipants,
  onOpenAddForm,
  onExportCSV
}: RegistrationsHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Pendaftar Kegiatan</CardTitle>
        <CardDescription>
          {filteredCount} orang telah mendaftar untuk kegiatan ini
          {maxParticipants ? ` (Kuota: ${maxParticipants})` : ''}
        </CardDescription>
      </div>
      <div className="flex gap-2">
        <Button onClick={onOpenAddForm} className="gap-2" variant="outline">
          <Plus className="h-4 w-4" /> Tambah Pendaftar
        </Button>
        <Button onClick={onExportCSV} className="gap-2" variant="outline">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>
    </CardHeader>
  );
}
