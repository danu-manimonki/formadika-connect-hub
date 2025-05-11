
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RegistrationsTable } from "./registrations/RegistrationsTable";
import { UpdateStatusDialog } from "./registrations/UpdateStatusDialog";
import { RegistrationFormSheet } from "./registrations/RegistrationFormSheet";
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
import { RegistrationsFilters } from "./registrations/RegistrationsFilters";

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

  const handleAddButtonClick = () => setIsAddFormOpen(true);

  return (
    <div className="space-y-4">
      <RegistrationsFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onAddClick={handleAddButtonClick}
        onExportClick={handleExportCSV}
      />

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

      {/* Add Registration Form */}
      <RegistrationFormSheet
        isOpen={isAddFormOpen}
        onOpenChange={setIsAddFormOpen}
        onSubmit={handleAddRegistration}
        title="Tambah Pendaftar Baru"
        description="Tambahkan peserta baru untuk kegiatan ini"
      />

      {/* Edit Registration Form */}
      <RegistrationFormSheet
        isOpen={isEditFormOpen}
        onOpenChange={(open) => {
          if (!open) setRegistrationToEdit(null);
          setIsEditFormOpen(open);
        }}
        onSubmit={handleEditRegistration}
        initialData={registrationToEdit}
        title="Edit Data Pendaftar"
        description="Perbarui informasi pendaftar"
      />
    </div>
  );
}
