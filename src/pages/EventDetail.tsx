
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Calendar, Clock, MapPin, Users, ArrowLeft, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";

const registerSchema = z.object({
  name: z.string().min(3, "Nama harus diisi minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().optional()
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const { user } = useAuth();
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: user?.email || "",
      phone: ""
    }
  });

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const { data: isRegistered, refetch: refetchRegistration } = useQuery({
    queryKey: ['eventRegistration', id, user?.id],
    queryFn: async () => {
      if (!id || !user?.id) return false;
      
      const { data, error } = await supabase
        .from('event_registrations')
        .select('id')
        .eq('event_id', id)
        .eq('user_id', user.id)
        .single();

      if (error) return false;
      return !!data;
    },
    enabled: !!user?.id && !!id
  });

  const handleRegister = async (values: RegisterFormData) => {
    try {
      if (!id || !user?.id) {
        toast.error("Anda harus login terlebih dahulu");
        return;
      }

      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: id,
          user_id: user.id,
          name: values.name,
          email: values.email,
          phone: values.phone || null,
          attendance_status: 'registered'
        });

      if (error) {
        if (error.code === '23505') {
          toast.error("Anda sudah terdaftar pada event ini");
        } else {
          toast.error("Gagal mendaftar: " + error.message);
        }
        throw error;
      }

      // Update registered_participants count
      await supabase.rpc('increment_participants', { event_id: id });
      
      toast.success("Berhasil mendaftar ke event");
      setIsRegistrationOpen(false);
      refetchRegistration();
    } catch (error) {
      console.error("Error registering to event:", error);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center">
            <div className="text-xl">Memuat informasi event...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event tidak ditemukan</h1>
            <Button asChild>
              <Link to="/events">Kembali ke Daftar Event</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const eventIsFullyBooked = event.max_participants && 
    event.registered_participants >= event.max_participants;

  const registrationClosed = event.status === 'completed' || 
    event.status === 'cancelled' || eventIsFullyBooked;

  return (
    <Layout>
      <div className="bg-formadika-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <Link to="/events" className="inline-flex items-center text-formadika-50 hover:text-white mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Kegiatan
          </Link>
          <div className="max-w-3xl">
            <div className="flex gap-2 mb-2">
              <Badge className={event.type === "online" ? "bg-blue-200 text-blue-800" : "bg-green-200 text-green-800"}>
                {event.type === "online" ? "Online" : "Offline"}
              </Badge>
              {event.status && (
                <Badge variant={event.status === "cancelled" ? "destructive" : "secondary"}>
                  {event.status === "upcoming" ? "Akan Datang" : 
                   event.status === "ongoing" ? "Sedang Berlangsung" : 
                   event.status === "completed" ? "Selesai" : "Dibatalkan"}
                </Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {event.image_url && (
              <div className="rounded-lg overflow-hidden mb-8">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-auto"
                />
              </div>
            )}
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Tentang Kegiatan</h2>
              <p className="whitespace-pre-line">{event.description}</p>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Informasi Event</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-formadika-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Tanggal</div>
                    <div className="text-gray-600">{event.date}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 text-formadika-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Waktu</div>
                    <div className="text-gray-600">{event.time}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 text-formadika-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Lokasi</div>
                    <div className="text-gray-600">{event.location}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="w-5 h-5 mr-3 text-formadika-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Peserta</div>
                    <div className="text-gray-600">
                      {event.registered_participants || 0} terdaftar
                      {event.max_participants ? ` dari ${event.max_participants}` : ''}
                    </div>
                  </div>
                </div>
              </div>

              {event.max_participants && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Kapasitas</span>
                    <span>{event.registered_participants || 0}/{event.max_participants}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-formadika-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(((event.registered_participants || 0) / event.max_participants) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
                
              {user ? (
                isRegistered ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
                      Anda sudah terdaftar pada kegiatan ini
                    </div>
                    <Button className="w-full" variant="outline">
                      Lihat Detail Pendaftaran
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full" 
                    onClick={() => setIsRegistrationOpen(true)}
                    disabled={registrationClosed}
                  >
                    {registrationClosed ? (
                      eventIsFullyBooked ? 'Kuota Pendaftaran Penuh' : 'Pendaftaran Ditutup'
                    ) : (
                      'Daftar Sekarang'
                    )}
                  </Button>
                )
              ) : (
                <div className="space-y-4">
                  <Button className="w-full" asChild>
                    <Link to="/auth">Login untuk Mendaftar</Link>
                  </Button>
                </div>
              )}
              
              <div className="mt-4">
                <Button variant="outline" className="w-full gap-2">
                  <Share2 className="h-4 w-4" /> Bagikan Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Daftar Kegiatan</DialogTitle>
            <DialogDescription>
              Lengkapi informasi berikut untuk mendaftar ke kegiatan "{event.title}"
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap Anda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan alamat email Anda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon (Opsional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nomor telepon Anda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsRegistrationOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">Daftar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
