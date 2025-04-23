
import { useState } from "react";
import { useCommittee } from "@/hooks/queries/useCommittee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function CommitteeSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const { toast } = useToast();

  const {
    query: { data: committee = [], isLoading },
    createMutation,
    updateMutation,
    deleteMutation,
  } = useCommittee();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const memberData = {
      name: formData.get("name"),
      position: formData.get("position"),
      period: formData.get("period"),
      university: formData.get("university"),
      status: formData.get("status"),
    };

    try {
      if (editingMember) {
        await updateMutation.mutateAsync({
          id: editingMember.id,
          ...memberData,
        });
        toast({
          title: "Success",
          description: "Member updated successfully",
        });
      } else {
        await createMutation.mutateAsync(memberData);
        toast({
          title: "Success",
          description: "New member added successfully",
        });
      }
      setIsAddDialogOpen(false);
      setEditingMember(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast({
        title: "Success",
        description: "Member deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredCommittee = committee.filter((item: any) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Tambah Pengurus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingMember ? "Edit Pengurus" : "Tambah Pengurus Baru"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingMember?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Jabatan</Label>
                <Input
                  id="position"
                  name="position"
                  defaultValue={editingMember?.position}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Periode</Label>
                <Input
                  id="period"
                  name="period"
                  defaultValue={editingMember?.period}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">Universitas</Label>
                <Input
                  id="university"
                  name="university"
                  defaultValue={editingMember?.university}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  className="w-full border rounded-md p-2"
                  defaultValue={editingMember?.status || "active"}
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
              <Button type="submit" className="w-full">
                {editingMember ? "Simpan Perubahan" : "Tambah Pengurus"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
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
                Tidak Aktif
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredCommittee.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-6 text-muted-foreground"
                    >
                      Tidak ada data pengurus yang sesuai filter
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCommittee.map((member: any) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.position}</TableCell>
                      <TableCell>{member.period}</TableCell>
                      <TableCell>{member.university}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            member.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {member.status === "active" ? "Aktif" : "Tidak Aktif"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingMember(member);
                              setIsAddDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
