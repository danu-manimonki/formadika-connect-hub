
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
  Trash2,
  Download 
} from "lucide-react";

// Sample data for members
const membersData = [
  {
    id: 1,
    name: "Agus Widodo",
    university: "Universitas Gadjah Mada",
    major: "Teknik Informatika",
    batch: "2020",
    location: "Yogyakarta",
    type: "active"
  },
  {
    id: 2,
    name: "Dina Pratiwi",
    university: "Universitas Sebelas Maret",
    major: "Akuntansi",
    batch: "2021",
    location: "Surakarta",
    type: "active"
  },
  {
    id: 3,
    name: "Budi Santoso",
    university: "Institut Teknologi Bandung",
    major: "Teknik Sipil",
    batch: "2019",
    location: "Bandung",
    type: "active"
  },
  {
    id: 8,
    name: "Rahmat Hidayat",
    university: "Universitas Gadjah Mada",
    major: "Ilmu Hukum",
    batch: "2018",
    location: "Jakarta",
    type: "alumni"
  },
  {
    id: 9,
    name: "Dewi Anggraini",
    university: "Universitas Indonesia",
    major: "Kedokteran",
    batch: "2017",
    location: "Jakarta",
    type: "alumni"
  },
  {
    id: 10,
    name: "Faisal Rahman",
    university: "Institut Teknologi Bandung",
    major: "Teknik Elektro",
    batch: "2016",
    location: "Bandung",
    type: "alumni"
  }
];

export default function MembersSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredMembers = membersData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.major.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return matchesSearch && item.type === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Anggota & Alumni</h2>
          <p className="text-muted-foreground">
            Kelola data anggota aktif dan alumni organisasi
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" /> Export Data
          </Button>
          <Button className="gap-1">
            <Plus className="h-4 w-4" /> Tambah Anggota
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Anggota dan Alumni</CardTitle>
          <CardDescription>
            Lihat dan kelola informasi anggota aktif dan alumni
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Cari berdasarkan nama, universitas, atau jurusan..." 
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
                Anggota Aktif
              </Button>
              <Button 
                variant={filter === "alumni" ? "secondary" : "outline"} 
                onClick={() => setFilter("alumni")}
                size="sm"
              >
                Alumni
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Universitas</TableHead>
                  <TableHead>Jurusan</TableHead>
                  <TableHead>Angkatan</TableHead>
                  <TableHead>Domisili</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.university}</TableCell>
                    <TableCell>{member.major}</TableCell>
                    <TableCell>{member.batch}</TableCell>
                    <TableCell>{member.location}</TableCell>
                    <TableCell>
                      <Badge variant={member.type === "active" ? "default" : "secondary"}>
                        {member.type === "active" ? "Aktif" : "Alumni"}
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
                {filteredMembers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      Tidak ada data anggota yang sesuai filter
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
