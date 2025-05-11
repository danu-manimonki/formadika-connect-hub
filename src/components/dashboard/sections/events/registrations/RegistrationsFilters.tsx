
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface RegistrationsFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  onAddClick: () => void;
  onExportClick: () => void;
}

export function RegistrationsFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  onAddClick,
  onExportClick
}: RegistrationsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
      <div className="relative w-full sm:max-w-sm">
        <input
          type="text"
          placeholder="Cari berdasarkan nama atau email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-formadika-600"
        />
      </div>
      
      <div className="flex gap-2 w-full sm:w-auto">
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-formadika-600"
        >
          <option value="all">Semua Status</option>
          <option value="registered">Terdaftar</option>
          <option value="attended">Hadir</option>
          <option value="absent">Tidak Hadir</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
        
        <Button onClick={onAddClick} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Tambah
        </Button>
        
        <Button variant="outline" size="sm" onClick={onExportClick}>
          Export CSV
        </Button>
      </div>
    </div>
  );
}
