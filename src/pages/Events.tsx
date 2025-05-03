
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, CalendarDays, ArrowRight, Wifi, WifiOff } from "lucide-react";
import { useEventsQuery } from "@/hooks/queries/events/useEventsQuery";
import { useState, useEffect } from "react";
import { Event } from "@/types/database";
import { Badge } from "@/components/ui/badge";

const Events = () => {
  const { data: apiEvents, isLoading } = useEventsQuery();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (apiEvents) {
      const now = new Date();
      
      // Filter events by status or date
      const upcoming = apiEvents.filter(event => 
        event.status === 'upcoming' || event.status === 'ongoing'
      );
      
      const past = apiEvents.filter(event => 
        event.status === 'completed' || event.status === 'cancelled'
      );
      
      // Sort upcoming events by date (closest first)
      setUpcomingEvents(upcoming.sort((a, b) => {
        // First by featured status
        if (a.is_featured && !b.is_featured) return -1;
        if (!a.is_featured && b.is_featured) return 1;
        
        // Then by date
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }));
      
      // Sort past events by date (most recent first)
      setPastEvents(past.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    }
  }, [apiEvents]);

  const EventCard = ({ event }: { event: Event }) => {
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
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{event.time}</span>
            </div>
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

  return (
    <Layout>
      <section className="bg-formadika-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Kegiatan
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Agenda Kegiatan FORMADIKA
            </h1>
            <p className="text-xl text-formadika-50">
              Ikuti berbagai kegiatan menarik yang diselenggarakan oleh FORMADIKA Karanganyar untuk mengembangkan diri dan memperluas jaringan.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-formadika-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">Jadwal Kegiatan</h2>
              <p className="text-gray-600">Temukan kegiatan-kegiatan yang diselenggarakan FORMADIKA</p>
            </div>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/calendar"><CalendarDays size={16} /> Lihat Kalender</Link>
            </Button>
          </div>
          
          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Kegiatan Mendatang</TabsTrigger>
              <TabsTrigger value="past">Kegiatan Sebelumnya</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              {isLoading ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Memuat data kegiatan...</p>
                </div>
              ) : upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">Tidak ada kegiatan mendatang saat ini</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="past">
              {isLoading ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Memuat data kegiatan...</p>
                </div>
              ) : pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">Tidak ada kegiatan sebelumnya</p>
                </div>
              )}
              {pastEvents.length > 6 && (
                <div className="mt-8 text-center">
                  <Button asChild variant="outline">
                    <a href="#">Lihat Lebih Banyak <ArrowRight size={16} className="ml-2" /></a>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="bg-white p-8 rounded-lg shadow-md mt-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-2 text-formadika-teal">Ingin Mengusulkan Kegiatan?</h3>
                <p className="text-gray-600 mb-4">
                  FORMADIKA membuka kesempatan bagi anggota untuk mengusulkan kegiatan yang bermanfaat bagi komunitas dan masyarakat Karanganyar.
                </p>
                <Button asChild>
                  <Link to="/contact">Ajukan Usulan</Link>
                </Button>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                  alt="Proposal Kegiatan"
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
