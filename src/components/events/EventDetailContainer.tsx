
import { Event } from "@/types/database";
import { EventDetailHeader } from "@/components/events/EventDetailHeader";
import { EventDetailInfo } from "@/components/events/EventDetailInfo";
import { RegularUser } from "@/types/database";
import { User } from "@supabase/supabase-js";
import { EventRegistrationHandler } from "./EventRegistrationHandler";

interface EventDetailContainerProps {
  event: Event;
  isRegistered: boolean;
  user: User | RegularUser | null;
  refetchRegistration: () => void;
}

export function EventDetailContainer({ 
  event, 
  isRegistered, 
  user,
  refetchRegistration
}: EventDetailContainerProps) {
  const eventIsFullyBooked = event.max_participants && 
    event.registered_participants >= event.max_participants;

  const registrationClosed = event.status === 'completed' || 
    event.status === 'cancelled' || eventIsFullyBooked;

  const { handleDirectRegister, isLoading } = EventRegistrationHandler({
    eventId: event.id,
    isRegistered,
    refetchRegistration
  });

  return (
    <>
      <EventDetailHeader event={event} />
      
      <div className="container mx-auto px-4 py-12">
        <EventDetailInfo 
          event={event}
          isRegistered={!!isRegistered}
          onRegister={handleDirectRegister}
          user={user}
          eventIsFullyBooked={eventIsFullyBooked}
          registrationClosed={registrationClosed}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
