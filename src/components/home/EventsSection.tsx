
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Workshop Beasiswa Lanjut Studi',
    date: '15 April 2025',
    location: 'Aula Pemda Karanganyar',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    participants: 50
  },
  {
    id: 2,
    title: 'Seminar Karir untuk Fresh Graduate',
    date: '20 April 2025',
    location: 'Zoom Meeting',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    participants: 100
  },
  {
    id: 3,
    title: 'Pengabdian Masyarakat Desa Binaan',
    date: '28 April 2025',
    location: 'Desa Karangpandan, Karanganyar',
    image: 'https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80',
    participants: 35
  }
];

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-2">{event.title}</h3>
        <div className="flex items-center text-gray-500 mb-2">
          <Calendar size={16} className="mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin size={16} className="mr-2" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center text-gray-500 mb-4">
          <Users size={16} className="mr-2" />
          <span>{event.participants} peserta</span>
        </div>
        <Button asChild variant="outline" className="w-full">
          <Link to={`/events/${event.id}`}>Lihat Detail</Link>
        </Button>
      </div>
    </div>
  );
};

const EventsSection = () => {
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
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
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
