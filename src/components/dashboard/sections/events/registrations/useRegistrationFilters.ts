
import { useState, useMemo } from 'react';

export function useRegistrationFilters(registrations: any[] = []) {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const filteredRegistrations = useMemo(() => {
    return registrations.filter(reg => {
      const matchesSearch = 
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (reg.phone && reg.phone.includes(searchTerm));
      
      if (selectedStatus === "all") return matchesSearch;
      return matchesSearch && reg.attendance_status === selectedStatus;
    });
  }, [registrations, searchTerm, selectedStatus]);

  return {
    selectedStatus,
    setSelectedStatus,
    searchTerm,
    setSearchTerm,
    filteredRegistrations
  };
}
