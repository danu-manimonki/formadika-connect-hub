
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { EventDetailHeader } from "@/components/events/EventDetailHeader";
import { EventDetailInfo } from "@/components/events/EventDetailInfo";
import { EventRegistrationForm } from "@/components/events/EventRegistrationForm";
import { z } from "zod";
import { Event } from "@/types/database";

// Schema imported from the EventRegistrationForm
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
      
      // Add type assertion to ensure the event conforms to the Event interface
      // This ensures that `type` is treated as 'online' | 'offline'
      return {
        ...data,
        type: data.type === 'online' ? 'online' : 'offline'
      } as Event;
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
      <EventDetailHeader event={event} />
      
      <div className="container mx-auto px-4 py-12">
        <EventDetailInfo 
          event={event}
          isRegistered={!!isRegistered}
          onRegister={() => setIsRegistrationOpen(true)}
          user={user}
          eventIsFullyBooked={eventIsFullyBooked}
          registrationClosed={registrationClosed}
        />
      </div>

      <EventRegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSubmit={handleRegister}
        event={event}
        defaultEmail={user?.email || ""}
      />
    </Layout>
  );
}
