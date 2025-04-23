
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CommitteeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
}

export function CommitteeFilters({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}: CommitteeFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari berdasarkan nama atau jabatan..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "secondary" : "outline"}
          onClick={() => onFilterChange("all")}
          size="sm"
        >
          Semua
        </Button>
        <Button
          variant={filter === "active" ? "secondary" : "outline"}
          onClick={() => onFilterChange("active")}
          size="sm"
        >
          Aktif
        </Button>
        <Button
          variant={filter === "inactive" ? "secondary" : "outline"}
          onClick={() => onFilterChange("inactive")}
          size="sm"
        >
          Tidak Aktif
        </Button>
      </div>
    </div>
  );
}
