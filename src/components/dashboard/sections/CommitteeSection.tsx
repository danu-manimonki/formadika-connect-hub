
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2 
} from "lucide-react";

// Dummy data for committee members
const committeeData = [
  { 
    id: 1, 
    name: "Agus Widodo", 
    position: "Ketua Umum", 
    period: "2024-2025", 
    university: "Universitas Gadjah Mada", 
    status: "active" 
  },
  { 
    id: 2, 
    name: "Dina Pratiwi", 
    position: "Sekretaris Umum", 
    period: "2024-2025", 
    university: "Universitas Sebelas Maret", 
    status: "active" 
  },
  { 
    id: 3, 
    name: "Budi Santoso", 
    position: "Bendahara Umum", 
    period: "2024-2025", 
    university: "Institut Teknologi Bandung", 
    status: "active" 
  },
  { 
    id: 4, 
    name: "Rina Wahyuni", 
    position: "Koordinator Divisi Pendidikan", 
    period: "2024-2025", 
    university: "Universitas Diponegoro", 
    status: "active" 
  },
  { 
    id: 5, 
    name: "Andi Permana", 
    position: "Koordinator Divisi Humas", 
    period: "2024-2025", 
    university: "Universitas Brawijaya", 
    status: "active" 
  },
  { 
    id: 6, 
    name: "Indah Lestari", 
    position: "Ketua Umum", 
    period: "2023-2024", 
    university: "Universitas Indonesia", 
    status: "inactive" 
  },
  { 
    id: 7, 
    name: "Rizki Ramadhan", 
    position: "Sekretaris Umum", 
    period: "2023-2024", 
    university: "Institut Seni Indonesia Surakarta", 
    status: "inactive" 
  }
];

export default function CommitteeSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredCommittee = committeeData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return matchesSearch && item.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pengurus</h2>
          <p className="text-muted-foreground">
            Kelola data struktur pengurus organisasi
          </p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" /> Tambah Pengurus
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pengurus</CardTitle>
          <CardDescription>
            Manajemen data pengurus aktif dan periode sebelumnya
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Cari berdasarkan nama atau jabatan..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === "all" ? "secondary" : "outline"} 
                onClick={() => setFilter("all")}
                size="sm"
              >
                Semua
              </Button>
              <Button 
                variant={filter === "active" ? "secondary" : "outline"} 
                onClick={() => setFilter("active")}
                size="sm"
              >
                Aktif
              </Button>
              <Button 
                variant={filter === "inactive" ? "secondary" : "outline"} 
                onClick={() => setFilter("inactive")}
                size="sm"
              >
                Periode Lalu
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Universitas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommittee.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.position}</TableCell>
                    <TableCell>{item.period}</TableCell>
                    <TableCell>{item.university}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === "active" ? "default" : "outline"}>
                        {item.status === "active" ? "Aktif" : "Periode Lalu"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCommittee.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Tidak ada data pengurus yang sesuai filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
