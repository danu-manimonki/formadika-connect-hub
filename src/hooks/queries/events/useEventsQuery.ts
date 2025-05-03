
import { Event } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEventsQuery() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      console.log("Fetching events...");
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        toast.error('Failed to fetch events');
        throw error;
      }

      console.log("Events fetched:", data);
      return data as Event[];
    }
  });
}
