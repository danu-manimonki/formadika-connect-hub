
import EventCard from './EventCard';
import { Event } from '@/types/database';

interface EventsGridProps {
  events: Event[];
  isLoading: boolean;
  emptyMessage?: string;
  showTime?: boolean;
}

const EventsGrid = ({ events, isLoading, emptyMessage = "Tidak ada kegiatan", showTime = false }: EventsGridProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Memuat data kegiatan...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} showTime={showTime} />
      ))}
    </div>
  );
};

export default EventsGrid;
