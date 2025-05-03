
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
  phone: z.string().min(1, "Nomor telepon harus diisi"),
  university: z.string().min(1, "Universitas harus diisi"),
  faculty: z.string().min(1, "Fakultas/Jurusan harus diisi")
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

  // Check if email is already registered (even without login)
  const checkEmailRegistered = async (email: string): Promise<boolean> => {
    if (!id) return false;
    
    const { data, error } = await supabase
      .from('event_registrations')
      .select('id')
      .eq('event_id', id)
      .eq('email', email)
      .single();
      
    return error ? false : !!data;
  };

  const handleRegister = async (values: RegisterFormData) => {
    try {
      if (!id) {
        toast.error("Event tidak valid");
        return;
      }

      // Check if email is already registered
      const isEmailRegistered = await checkEmailRegistered(values.email);
      if (isEmailRegistered) {
        toast.error("Email ini sudah terdaftar pada event ini");
        return;
      }

      // Trying to register - first let's create the registration data
      const registrationData = {
        event_id: id,
        user_id: user?.id || null,
        name: values.name,
        email: values.email,
        phone: values.phone,
        university: values.university,
        faculty: values.faculty,
        attendance_status: 'registered',
        registration_date: new Date().toISOString()
      };

      // Try inserting the registration with admin rights - this avoids RLS policies
      // In a real implementation, this should be done through a secure server endpoint
      // Use the Supabase client with admin rights via service role token
      const { error } = await fetch(`${import.meta.env.VITE_API_URL}/api/register-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      }).then(res => res.json());

      if (error) {
        console.error("Registration error:", error);
        toast.error("Gagal mendaftar: " + (error.message || "Terjadi kesalahan"));
        return;
      }

      toast.success("Berhasil mendaftar ke event");
      setIsRegistrationOpen(false);
      
      if (user?.id) {
        refetchRegistration();
      }
      
      // Refresh event data to update participant count
      if (event) {
        supabase.rpc('increment_participants', { event_id: id });
      }
    } catch (error) {
      console.error("Error registering to event:", error);
      toast.error("Gagal mendaftar: Terjadi kesalahan sistem");
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
          allowGuestRegistration={true}
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
