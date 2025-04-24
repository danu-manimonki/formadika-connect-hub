import { useState, useEffect } from "react";
import { useCommittee, type CommitteeMember } from "@/hooks/queries/useCommittee";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CommitteeForm } from "./committee/CommitteeForm";
import { CommitteeTable } from "./committee/CommitteeTable";
import { CommitteeFilters } from "./committee/CommitteeFilters";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function CommitteeSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Current session:", data.session);
      console.log("User authenticated:", !!data.session);
    };
    
    checkSession();
  }, []);

  const {
    query: { data: committee = [], isLoading },
    createMutation,
    updateMutation,
    deleteMutation,
  } = useCommittee();

  console.log("Committee data:", committee);
  console.log("Loading state:", isLoading);
  console.log("Current user:", user);
  console.log("Is admin:", isAdmin);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, photo: File | null) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to perform this action",
        variant: "destructive",
      });
      return;
    }
    
    const formData = new FormData(e.currentTarget);
    const memberData = {
      name: String(formData.get("name") || ""),
      position: String(formData.get("position") || ""),
      period: String(formData.get("period") || ""),
      university: String(formData.get("university") || ""),
      status: String(formData.get("status") || "active") as 'active' | 'inactive',
    };

    console.log("Submitting member data:", memberData);
    console.log("Editing member:", editingMember);

    try {
      if (editingMember) {
        console.log("Updating member with ID:", editingMember.id);
        await updateMutation.mutateAsync({
          id: editingMember.id,
          data: memberData,
          photo
        });
        toast({
          title: "Berhasil",
          description: "Data pengurus berhasil diperbarui",
        });
      } else {
        console.log("Creating new member");
        await createMutation.mutateAsync({
          data: memberData,
          photo
        });
        toast({
          title: "Berhasil",
          description: "Pengurus baru berhasil ditambahkan",
        });
      }
      setIsAddDialogOpen(false);
      setEditingMember(null);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to delete committee members",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Deleting member with ID:", id);
    try {
      await deleteMutation.mutateAsync(id);
      toast({
        title: "Berhasil",
        description: "Data pengurus berhasil dihapus",
      });
    } catch (error: any) {
      console.error("Error deleting member:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredCommittee = committee.filter((item: CommitteeMember) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "all") return matchesSearch;
    return matchesSearch && item.status === filter;
  });
  
  if (!user) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              You need to be logged in to access the committee management section
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pengurus</h2>
          <p className="text-muted-foreground">
            Kelola data struktur pengurus organisasi
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) setEditingMember(null);
        }}>
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
              <DialogDescription>
                {editingMember 
                  ? "Edit informasi pengurus organisasi" 
                  : "Tambahkan data pengurus baru ke dalam sistem"
                }
              </DialogDescription>
            </DialogHeader>
            <CommitteeForm 
              editingMember={editingMember} 
              onSubmit={handleSubmit} 
            />
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
          <CommitteeFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
          />

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
                <CommitteeTable
                  isLoading={isLoading}
                  committee={filteredCommittee}
                  onEdit={(member) => {
                    console.log("Editing member:", member);
                    setEditingMember(member);
                    setIsAddDialogOpen(true);
                  }}
                  onDelete={handleDelete}
                />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
