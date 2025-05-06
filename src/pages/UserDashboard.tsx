
import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, UserCircle, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Event, RegularUser } from "@/types/database";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function UserDashboard() {
  const [user, setUser] = useState<RegularUser | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('regular_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const { data: registeredEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ['userRegisteredEvents', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      
      // Get all event registrations for this user
      const { data: registrations, error: regError } = await supabase
        .from('event_registrations')
        .select('event_id')
        .eq('email', user.email);
      
      if (regError) {
        console.error("Error fetching event registrations:", regError);
        return [];
      }
      
      if (!registrations.length) return [];
      
      // Get full event details for all registered events
      const eventIds = registrations.map(reg => reg.event_id);
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .in('id', eventIds);
        
      if (eventsError) {
        console.error("Error fetching events:", eventsError);
        return [];
      }
      
      return events as Event[];
    },
    enabled: !!user?.email
  });

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Akses Ditolak</h1>
            <p className="mb-4">Anda harus login untuk mengakses halaman ini.</p>
            <Link to="/login" className="text-formadika-teal hover:underline">
              Login sekarang
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-formadika-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Dashboard Anggota</h1>
            <p className="text-lg text-formadika-50">
              Selamat datang, {user.name}
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCircle className="mr-2 h-5 w-5" />
                  Profil Saya
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nama</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                {user.university && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Universitas</p>
                    <p className="font-medium">{user.university}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="events">
              <TabsList className="mb-6">
                <TabsTrigger value="events">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Event Saya
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Terdaftar</CardTitle>
                    <CardDescription>
                      Daftar kegiatan yang Anda telah daftar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {eventsLoading ? (
                      <div className="text-center py-6">Memuat data...</div>
                    ) : !registeredEvents || registeredEvents.length === 0 ? (
                      <div className="text-center py-6 text-gray-500">
                        <p className="mb-3">Anda belum terdaftar ke event apapun.</p>
                        <Link to="/events" className="text-formadika-teal hover:underline">
                          Lihat daftar event
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {registeredEvents.map((event) => (
                          <div 
                            key={event.id} 
                            className="border rounded-lg p-4 flex justify-between items-start hover:border-formadika-teal transition-colors"
                          >
                            <div>
                              <h3 className="font-medium text-lg mb-1">{event.title}</h3>
                              <div className="flex items-center text-gray-500 text-sm mb-1">
                                <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                                {event.date}
                              </div>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                {event.time}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge variant={event.status === 'completed' ? 'secondary' : 'default'}>
                                {event.status === 'upcoming' ? 'Akan Datang' : 
                                 event.status === 'ongoing' ? 'Sedang Berlangsung' : 
                                 'Selesai'}
                              </Badge>
                              <Link 
                                to={`/events/${event.id}`} 
                                className="text-sm text-formadika-teal hover:underline"
                              >
                                Lihat Detail
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
