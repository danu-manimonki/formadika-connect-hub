
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, Wifi, WifiOff, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event } from '@/types/database';

interface EventCardProps {
  event: Event;
  showTime?: boolean;
}

const EventCard = ({ event, showTime = false }: EventCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={event.image_url || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"} 
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
          {showTime && (
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-2" />
            <span>{event.registered_participants || event.participants} peserta</span>
          </div>
        </div>
        <Button asChild className="w-full">
          <Link to={`/events/${event.id}`}>Detail Acara</Link>
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
