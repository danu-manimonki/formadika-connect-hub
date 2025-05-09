
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useRegistrations(eventId: string) {
  const registrationsQuery = useQuery({
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
  
  const countQuery = useQuery({
    queryKey: ['eventRegistrationsCount', eventId],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('event_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', eventId);
      
      if (error) {
        console.error("Error fetching registration count:", error);
        return 0;
      }
      
      return count || 0;
    }
  });

  return {
    data: registrationsQuery.data || [],
    isLoading: registrationsQuery.isLoading,
    refetch: registrationsQuery.refetch,
    count: countQuery.data || 0,
    isCountLoading: countQuery.isLoading
  };
}
