
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function updateRegistrationStatus(registrationId: string, newStatus: string) {
  try {
    const { error } = await supabase
      .from('event_registrations')
      .update({ attendance_status: newStatus })
      .eq('id', registrationId);

    if (error) throw error;
    
    toast.success("Status pendaftaran berhasil diperbarui");
    return true;
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Gagal memperbarui status");
    return false;
  }
}

export async function addRegistration(data: any, eventId: string) {
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
    return true;
  } catch (error: any) {
    console.error("Error adding registration:", error);
    toast.error(`Gagal menambahkan pendaftar: ${error.message}`);
    return false;
  }
}

export async function editRegistration(data: any, registrationId: string) {
  try {
    const { error } = await supabase
      .from('event_registrations')
      .update(data)
      .eq('id', registrationId);

    if (error) throw error;
    
    toast.success("Data pendaftar berhasil diperbarui");
    return true;
  } catch (error: any) {
    console.error("Error updating registration:", error);
    toast.error(`Gagal memperbarui data: ${error.message}`);
    return false;
  }
}

export async function deleteRegistration(id: string, eventId: string, registeredCount: number) {
  try {
    if (!confirm("Apakah Anda yakin ingin menghapus pendaftaran ini?")) return false;

    const { error } = await supabase
      .from('event_registrations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    // Update registered_participants count
    await supabase.from('events')
      .update({ registered_participants: Math.max(registeredCount - 1, 0) })
      .eq('id', eventId);
    
    toast.success("Pendaftar berhasil dihapus");
    return true;
  } catch (error: any) {
    console.error("Error deleting registration:", error);
    toast.error(`Gagal menghapus pendaftar: ${error.message}`);
    return false;
  }
}

export function exportToCSV(filteredRegistrations: any[], eventTitle: string = 'event') {
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
  link.setAttribute("download", `pendaftaran-${eventTitle}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  toast.success("Data berhasil diekspor ke CSV");
}
