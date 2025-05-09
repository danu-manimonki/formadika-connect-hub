
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useRegistrations(eventId: string) {
  return useQuery({
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
}
