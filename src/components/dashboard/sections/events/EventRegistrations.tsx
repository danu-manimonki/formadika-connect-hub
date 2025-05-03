
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Download, Mail, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EventRegistrationProps {
  eventId: string;
}

export function EventRegistrations({ eventId }: EventRegistrationProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [registrationToUpdate, setRegistrationToUpdate] = useState<any>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");

  const { data: registrations = [], isLoading, refetch } = useQuery({
    queryKey: ['eventRegistrations', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('event_id', eventId)
        .order('registration_date', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const { data: event } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const handleUpdateStatus = async () => {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .update({ attendance_status: newStatus })
        .eq('id', registrationToUpdate.id);

      if (error) throw error;
      
      toast.success("Status pendaftaran berhasil diperbarui");
      setIsUpdateDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Gagal memperbarui status");
    }
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reg.phone && reg.phone.includes(searchTerm));
    
    if (selectedStatus === "all") return matchesSearch;
    return matchesSearch && reg.attendance_status === selectedStatus;
  });

  const exportToCSV = () => {
    // Implementation for exporting data
    const headers = ["Nama", "Email", "Telepon", "Status", "Tanggal Pendaftaran", "Catatan"];
    
    const csvData = filteredRegistrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone || "-",
      reg.attendance_status,
      new Date(reg.registration_date).toLocaleString(),
      reg.notes || "-"
    ]);
    
    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pendaftaran-${event?.title || 'event'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Data berhasil diekspor ke CSV");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'registered':
        return <Badge variant="outline">Terdaftar</Badge>;
      case 'confirmed':
        return <Badge variant="secondary">Dikonfirmasi</Badge>;
      case 'attended':
        return <Badge className="bg-green-100 text-green-800">Hadir</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Pendaftar Kegiatan</CardTitle>
          <CardDescription>
            {filteredRegistrations.length} orang telah mendaftar untuk kegiatan ini
            {event?.max_participants ? ` (Kuota: ${event.max_participants})` : ''}
          </CardDescription>
        </div>
        <Button onClick={exportToCSV} className="gap-2" variant="outline">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="relative w-full md:w-80">
            <Input 
              placeholder="Cari berdasarkan nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>No. Telepon</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Daftar</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Memuat data pendaftar...
                  </TableCell>
                </TableRow>
              ) : filteredRegistrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    {searchTerm || selectedStatus !== "all" 
                      ? "Tidak ada pendaftar yang sesuai filter" 
                      : "Belum ada pendaftar untuk kegiatan ini"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRegistrations.map(registration => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.name}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{registration.phone || "-"}</TableCell>
                    <TableCell>{getStatusBadge(registration.attendance_status)}</TableCell>
                    <TableCell>
                      {new Date(registration.registration_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setRegistrationToUpdate(registration);
                            setNewStatus(registration.attendance_status);
                            setIsUpdateDialogOpen(true);
                          }}
                        >
                          Ubah Status
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
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
      
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Status Pendaftaran</DialogTitle>
            <DialogDescription>
              Perbarui status pendaftaran untuk {registrationToUpdate?.name}
            </DialogDescription>
          </DialogHeader>
          
          <Select value={newStatus} onValueChange={setNewStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status baru" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="registered">Terdaftar</SelectItem>
              <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
              <SelectItem value="attended">Hadir</SelectItem>
              <SelectItem value="cancelled">Dibatalkan</SelectItem>
            </SelectContent>
          </Select>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleUpdateStatus}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
