
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useEventsQuery } from "@/hooks/queries/events/useEventsQuery";
import { useState, useEffect } from "react";
import { Event } from "@/types/database";
import EventsGrid from "@/components/events/EventsGrid";
import ProposalCTA from "@/components/events/ProposalCTA";

const Events = () => {
  const { data: apiEvents, isLoading, error } = useEventsQuery();
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
          
          {error ? (
            <div className="p-8 text-center">
              <p className="text-red-500 mb-2">Terjadi kesalahan saat memuat data kegiatan</p>
              <Button onClick={() => window.location.reload()} variant="outline">Coba lagi</Button>
            </div>
          ) : (
            <Tabs defaultValue="upcoming" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="upcoming">Kegiatan Mendatang</TabsTrigger>
                <TabsTrigger value="past">Kegiatan Sebelumnya</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming">
                <EventsGrid 
                  events={upcomingEvents} 
                  isLoading={isLoading} 
                  emptyMessage="Tidak ada kegiatan mendatang saat ini"
                  showTime={true}
                />
              </TabsContent>
              <TabsContent value="past">
                <EventsGrid 
                  events={pastEvents} 
                  isLoading={isLoading} 
                  emptyMessage="Tidak ada kegiatan sebelumnya"
                  showTime={true}
                />
                {pastEvents.length > 6 && (
                  <div className="mt-8 text-center">
                    <Button asChild variant="outline">
                      <a href="#">Lihat Lebih Banyak <ArrowRight size={16} className="ml-2" /></a>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
          
          <ProposalCTA />
        </div>
      </section>
    </Layout>
  );
};

export default Events;
