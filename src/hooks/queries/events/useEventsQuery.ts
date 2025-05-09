
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

      // Update the status based on date if needed
      const today = new Date();
      const updatedEvents = data?.map(event => {
        const eventDate = new Date(event.date);
        
        // Compare dates to determine real status
        if (event.status === 'upcoming' && eventDate < today) {
          return { ...event, status: 'ongoing' };
        } else if (event.status === 'ongoing' && eventDate.getTime() + (24 * 60 * 60 * 1000) < today.getTime()) {
          // If event date was more than 1 day ago, mark as completed
          return { ...event, status: 'completed' };
        }
        return event;
      });
      
      console.log("Events fetched:", updatedEvents);
      return updatedEvents as Event[];
    }
  });
}
