
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface EventFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
}

export function EventFilters({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
}: EventFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cari berdasarkan judul atau lokasi..."
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
          variant={filter === "online" ? "secondary" : "outline"}
          onClick={() => onFilterChange("online")}
          size="sm"
        >
          Online
        </Button>
        <Button
          variant={filter === "offline" ? "secondary" : "outline"}
          onClick={() => onFilterChange("offline")}
          size="sm"
        >
          Offline
        </Button>
      </div>
    </div>
  );
}
