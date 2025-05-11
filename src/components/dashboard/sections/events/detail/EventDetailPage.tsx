
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types/database";
import { EventDetailPageHeader } from "./EventDetailPageHeader";
import { EventDetailPageContent } from "./EventDetailPageContent";

interface EventDetailPageProps {
  eventId: string;
  onBack: () => void;
}

export function EventDetailPage({ eventId, onBack }: EventDetailPageProps) {
  const { data: event, isLoading, refetch } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      
      // Add type assertion to ensure the event conforms to the Event interface
      return {
        ...data,
        type: data.type === 'online' ? 'online' : 'offline'
      } as Event;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-xl font-semibold">Memuat data event...</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-xl font-semibold">Event tidak ditemukan</div>
          <button onClick={onBack} className="mt-4">Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EventDetailPageHeader 
        event={event} 
        onBack={onBack} 
        onSuccess={refetch} 
      />
      
      <EventDetailPageContent 
        event={event}
        onRefresh={refetch}
      />
    </div>
  );
}
