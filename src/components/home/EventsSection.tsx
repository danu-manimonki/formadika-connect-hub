
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useEventsQuery } from '@/hooks/queries/events/useEventsQuery';
import { useEffect, useState } from 'react';
import { Event } from '@/types/database';
import EventCard from '../events/EventCard';

const EventsSection = () => {
  const { data: apiEvents, isLoading } = useEventsQuery();
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    if (apiEvents && apiEvents.length > 0) {
      // Only show featured events or latest 3 events
      const filteredEvents = apiEvents
        .filter(event => event.status === 'upcoming' || !event.status) // Only show upcoming events
        .sort((a, b) => {
          // Prioritize featured events
          if (a.is_featured && !b.is_featured) return -1;
          if (!a.is_featured && b.is_featured) return 1;
          // Then sort by date
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

      setEvents(filteredEvents.slice(0, 3)); // Take only the first 3
    }
  }, [apiEvents, isLoading]);

  return (
    <section className="section bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-formadika-100 text-formadika-800">
            Agenda Kegiatan
          </div>
          <h2 className="text-3xl font-bold">Kegiatan Mendatang</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            Berbagai kegiatan menarik yang bisa kamu ikuti untuk mengembangkan diri dan memperluas jaringan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-500">
                {isLoading ? 'Memuat data kegiatan...' : 'Tidak ada kegiatan mendatang saat ini'}
              </p>
            </div>
          )}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild>
            <Link to="/events">
              Lihat Semua Kegiatan <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
