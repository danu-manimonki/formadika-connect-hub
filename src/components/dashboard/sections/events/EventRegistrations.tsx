
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { RegistrationsFilters } from "./registrations/RegistrationsFilters";
import { RegistrationsTable } from "./registrations/RegistrationsTable";
import { UpdateStatusDialog } from "./registrations/UpdateStatusDialog";
import { RegistrationForm } from "./registrations/RegistrationForm";
import { RegistrationsHeader } from "./registrations/RegistrationsHeader";
import { useRegistrations } from "./registrations/hooks/useRegistrations";
import { useRegistrationFilters } from "./registrations/useRegistrationFilters";
import { 
  addRegistration, 
  deleteRegistration, 
  editRegistration, 
  exportToCSV, 
  updateRegistrationStatus 
} from "./registrations/actions/registrationActions";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EventRegistrationProps {
  eventId: string;
}

export function EventRegistrations({ eventId }: EventRegistrationProps) {
  const [registrationToUpdate, setRegistrationToUpdate] = useState<any>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [registrationToEdit, setRegistrationToEdit] = useState<any>(null);

  // Fetch registrations with improved hook
  const { data: registrations = [], isLoading, refetch, count: registrationCount } = useRegistrations(eventId);
  
  // Filter registrations
  const {
    selectedStatus,
    setSelectedStatus,
    searchTerm,
    setSearchTerm,
    filteredRegistrations
  } = useRegistrationFilters(registrations);

  // Fetch event data
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
    if (!registrationToUpdate) return;
    
    const success = await updateRegistrationStatus(registrationToUpdate.id, newStatus);
    if (success) {
      setIsUpdateDialogOpen(false);
      refetch();
    }
  };

  const handleAddRegistration = async (data: any) => {
    const success = await addRegistration(data, eventId);
    if (success) {
      setIsAddFormOpen(false);
      refetch();
    }
  };

  const handleEditRegistration = async (data: any) => {
    if (!registrationToEdit) return;
    
    const success = await editRegistration(data, registrationToEdit.id);
    if (success) {
      setIsEditFormOpen(false);
      setRegistrationToEdit(null);
      refetch();
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    const registeredCount = event?.registered_participants || 0;
    const success = await deleteRegistration(id, eventId, registeredCount);
    if (success) {
      refetch();
    }
  };

  const handleSelectRegistration = (registration: any) => {
    setRegistrationToUpdate(registration);
    setIsUpdateDialogOpen(true);
  };

  const handleEditButton = (registration: any) => {
    setRegistrationToEdit(registration);
    setIsEditFormOpen(true);
  };
  
  const handleExportCSV = () => {
    exportToCSV(filteredRegistrations, event?.title);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-formadika-600"
          />
        </div>
        
        <div className="flex gap-2">
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
          
          <Button onClick={() => setIsAddFormOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Tambah Pendaftar
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            Export CSV
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
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
    </div>
  );
}
