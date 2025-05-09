
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useEventDetail } from "@/components/events/useEventDetail";
import { EventDetailContainer } from "@/components/events/EventDetailContainer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { event, eventLoading, isRegistered, currentUser, refetchRegistration } = useEventDetail(id);
  
  // Get accurate registration count
  const { data: registrationCount } = useQuery({
    queryKey: ['eventDetailRegistrationCount', id],
    queryFn: async () => {
      if (!id) return 0;
      
      const { count, error } = await supabase
        .from('event_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', id);
      
      if (error) {
        console.error("Error fetching registration count:", error);
        return event?.registered_participants || 0;
      }
      
      // Update the event object with the actual count if needed
      if (event && count !== event.registered_participants) {
        await supabase
          .from('events')
          .update({ registered_participants: count })
          .eq('id', id);
      }
      
      return count || 0;
    },
    enabled: !!id && !!event,
    initialData: event?.registered_participants || 0
  });

  if (eventLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center">
            <div className="text-xl">Memuat informasi event...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event tidak ditemukan</h1>
          </div>
        </div>
      </Layout>
    );
  }

  // Create a modified event object with the correct registration count
  const eventWithCorrectCount = {
    ...event,
    registered_participants: registrationCount
  };

  return (
    <Layout>
      <EventDetailContainer
        event={eventWithCorrectCount}
        isRegistered={!!isRegistered}
        user={currentUser}
        refetchRegistration={refetchRegistration}
      />
    </Layout>
  );
}
