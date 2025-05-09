
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RegistrationsFilters } from "./registrations/RegistrationsFilters";
import { RegistrationsTable } from "./registrations/RegistrationsTable";
import { UpdateStatusDialog } from "./registrations/UpdateStatusDialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { RegistrationForm } from "./registrations/RegistrationForm";

interface EventRegistrationProps {
  eventId: string;
}

export function EventRegistrations({ eventId }: EventRegistrationProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [registrationToUpdate, setRegistrationToUpdate] = useState<any>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [registrationToEdit, setRegistrationToEdit] = useState<any>(null);

  const { data: registrations = [], isLoading, refetch } = useQuery({
    queryKey: ['eventRegistrations', eventId],
    queryFn: async () => {
      console.log("Fetching registrations for event:", eventId);
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('event_id', eventId)
        .order('registration_date', { ascending: false });

      if (error) {
        console.error("Error fetching registrations:", error);
        throw error;
      }

      console.log("Fetched registrations:", data);
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

  const handleUpdateStatus = async (newStatus: string) => {
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

  const handleAddRegistration = async (data: any) => {
    try {
      const registrationData = {
        ...data,
        event_id: eventId,
        registration_date: new Date().toISOString(),
        attendance_status: 'registered'
      };

      const { error } = await supabase
        .from('event_registrations')
        .insert(registrationData);

      if (error) throw error;

      // Update registered_participants count
      await supabase.rpc('increment_participants', { event_id: eventId });
      
      toast.success("Pendaftar berhasil ditambahkan");
      setIsAddFormOpen(false);
      refetch();
    } catch (error: any) {
      console.error("Error adding registration:", error);
      toast.error(`Gagal menambahkan pendaftar: ${error.message}`);
    }
  };

  const handleEditRegistration = async (data: any) => {
    try {
      const { error } = await supabase
        .from('event_registrations')
        .update(data)
        .eq('id', registrationToEdit.id);

      if (error) throw error;
      
      toast.success("Data pendaftar berhasil diperbarui");
      setIsEditFormOpen(false);
      setRegistrationToEdit(null);
      refetch();
    } catch (error: any) {
      console.error("Error updating registration:", error);
      toast.error(`Gagal memperbarui data: ${error.message}`);
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    try {
      if (!confirm("Apakah Anda yakin ingin menghapus pendaftaran ini?")) return;

      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Update registered_participants count
      await supabase.from('events')
        .update({ registered_participants: Math.max((event?.registered_participants || 1) - 1, 0) })
        .eq('id', eventId);
      
      toast.success("Pendaftar berhasil dihapus");
      refetch();
    } catch (error: any) {
      console.error("Error deleting registration:", error);
      toast.error(`Gagal menghapus pendaftar: ${error.message}`);
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

  const handleSelectRegistration = (registration: any) => {
    setRegistrationToUpdate(registration);
    setIsUpdateDialogOpen(true);
  };

  const handleEditButton = (registration: any) => {
    setRegistrationToEdit(registration);
    setIsEditFormOpen(true);
  };
  
  // Use actual registration count instead of event.registered_participants
  const registrationCount = registrations.length;

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
        <div className="flex gap-2">
          <Button onClick={() => setIsAddFormOpen(true)} className="gap-2" variant="outline">
            <Plus className="h-4 w-4" /> Tambah Pendaftar
          </Button>
          <Button onClick={exportToCSV} className="gap-2" variant="outline">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <RegistrationsFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        <div className="border rounded-md">
          <RegistrationsTable 
            registrations={filteredRegistrations}
            isLoading={isLoading}
            searchTerm={searchTerm}
            selectedStatus={selectedStatus}
            onUpdateStatus={handleSelectRegistration}
            onEdit={handleEditButton}
            onDelete={handleDeleteRegistration}
          />
        </div>
      </CardContent>
      
      {registrationToUpdate && (
        <UpdateStatusDialog 
          registration={registrationToUpdate}
          isOpen={isUpdateDialogOpen}
          onOpenChange={setIsUpdateDialogOpen}
          onUpdate={handleUpdateStatus}
        />
      )}

      {/* Add Registration Sheet */}
      <Sheet open={isAddFormOpen} onOpenChange={setIsAddFormOpen}>
        <SheetContent className="w-[90%] sm:max-w-[540px] lg:max-w-[640px] overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle>Tambah Pendaftar Baru</SheetTitle>
            <SheetDescription>
              Tambahkan peserta baru untuk kegiatan ini
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <RegistrationForm onSubmit={handleAddRegistration} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Edit Registration Sheet */}
      <Sheet open={isEditFormOpen} onOpenChange={(open) => {
        if (!open) setRegistrationToEdit(null);
        setIsEditFormOpen(open);
      }}>
        <SheetContent className="w-[90%] sm:max-w-[540px] lg:max-w-[640px] overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle>Edit Data Pendaftar</SheetTitle>
            <SheetDescription>
              Perbarui informasi pendaftar
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            {registrationToEdit && (
              <RegistrationForm 
                onSubmit={handleEditRegistration} 
                initialData={registrationToEdit} 
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
