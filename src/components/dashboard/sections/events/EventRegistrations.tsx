
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { RegistrationsFilters } from "./registrations/RegistrationsFilters";
import { RegistrationsTable } from "./registrations/RegistrationsTable";
import { UpdateStatusDialog } from "./registrations/UpdateStatusDialog";

interface EventRegistrationProps {
  eventId: string;
}

export function EventRegistrations({ eventId }: EventRegistrationProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [registrationToUpdate, setRegistrationToUpdate] = useState<any>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

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
    </Card>
  );
}
