
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RegistrationsFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
}

export function RegistrationsFilters({ 
  searchTerm, 
  onSearchChange,
  selectedStatus,
  onStatusChange
}: RegistrationsFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
      <div className="relative w-full md:w-80">
        <Input 
          placeholder="Cari berdasarkan nama atau email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-full md:w-40">
          <SelectValue placeholder="Filter Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Status</SelectItem>
          <SelectItem value="registered">Terdaftar</SelectItem>
          <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
          <SelectItem value="attended">Hadir</SelectItem>
          <SelectItem value="cancelled">Dibatalkan</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
