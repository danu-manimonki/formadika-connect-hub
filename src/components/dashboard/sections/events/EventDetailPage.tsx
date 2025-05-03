
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, ArrowLeft, Calendar, Clock, MapPin, Users, Mail, Share } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { EventForm } from "./EventForm";
import { EventRegistrations } from "./EventRegistrations";
import { useNavigate } from "react-router-dom";
import { Event } from "@/types/database";

interface EventDetailPageProps {
  eventId: string;
  onBack: () => void;
}

export function EventDetailPage({ eventId, onBack }: EventDetailPageProps) {
  const navigate = useNavigate();
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const { data: event, isLoading, refetch } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      
      // Ensure the type is correctly typed as 'online' | 'offline'
      const typedEvent = {
        ...data,
        type: data.type === 'online' ? 'online' : 'offline'
      } as Event;
      
      return typedEvent;
    }
  });

  const handleEditSuccess = () => {
    setIsEditSheetOpen(false);
    refetch();
    toast.success("Event berhasil diperbarui");
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Akan Datang</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-800">Sedang Berlangsung</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Selesai</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-xl font-semibold">Memuat data event...</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-xl font-semibold">Event tidak ditemukan</div>
          <Button onClick={onBack} className="mt-4">Kembali</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Share className="h-4 w-4" /> Bagikan
          </Button>
          <Button onClick={() => setIsEditSheetOpen(true)} className="gap-2">
            <Edit className="h-4 w-4" /> Edit Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              {event.image_url ? (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Tidak ada gambar</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Informasi Event</TabsTrigger>
              <TabsTrigger value="registrations">Pendaftar ({event.registered_participants || 0})</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{event.title}</h2>
                      <div className="flex gap-2 mt-1">
                        <Badge variant={event.type === 'online' ? 'secondary' : 'default'}>
                          {event.type === 'online' ? 'Online' : 'Offline'}
                        </Badge>
                        {getStatusBadge(event.status)}
                        {event.is_featured && (
                          <Badge variant="outline" className="bg-yellow-100 border-yellow-200 text-yellow-800">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Detail Event</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          <span>
                            {event.registered_participants || 0} terdaftar 
                            {event.max_participants ? ` (Kuota: ${event.max_participants})` : ''}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Tentang Event</h3>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button className="gap-2">
                  <Mail className="h-4 w-4" /> Kirim Email ke Pendaftar
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("registrations")}>
                  Lihat Pendaftar
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="registrations">
              <EventRegistrations eventId={event.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Statistik Event</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pendaftar</span>
                    <span className="font-medium">
                      {event.registered_participants || 0}
                      {event.max_participants ? ` / ${event.max_participants}` : ''}
                    </span>
                  </div>
                  {event.max_participants && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-formadika-600 h-2.5 rounded-full" 
                        style={{ 
                          width: `${Math.min(
                            ((event.registered_participants || 0) / event.max_participants) * 100, 
                            100
                          )}%` 
                        }}
                      ></div>
                    </div>
                  )}
                </div>
                
                <div className="pt-2 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("registrations")}>
                      Lihat Pendaftar
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => navigate(`/events/${eventId}`)}>
                      Lihat Publik
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Aksi Cepat</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" /> Kirim Email Pengumuman
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share className="h-4 w-4 mr-2" /> Bagikan Event
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setIsEditSheetOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit Informasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="w-[90%] sm:max-w-[540px] lg:max-w-[640px] overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle>Edit Event</SheetTitle>
            <SheetDescription>
              Ubah informasi kegiatan
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <EventForm 
              event={event} 
              onSuccess={handleEditSuccess}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
