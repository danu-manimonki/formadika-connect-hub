
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, ArrowRight, Wifi, WifiOff } from 'lucide-react';
import { useEventsQuery } from '@/hooks/queries/events/useEventsQuery';
import { useEffect, useState } from 'react';
import { Event } from '@/types/database';
import { Badge } from '@/components/ui/badge';

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={event.image_url || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'} 
          alt={event.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            event.type === 'online' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {event.type === 'online' ? (
              <><Wifi size={14} /> Online</>
            ) : (
              <><WifiOff size={14} /> Offline</>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-2" />
            <span>{event.participants} peserta</span>
          </div>
        </div>
        <Button asChild className="w-full">
          <Link to={`/events/${event.id}`}>Detail Acara</Link>
        </Button>
      </div>
    </div>
  );
};

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
