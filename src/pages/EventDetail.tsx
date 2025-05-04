
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { EventDetailHeader } from "@/components/events/EventDetailHeader";
import { EventDetailInfo } from "@/components/events/EventDetailInfo";
import { EventRegistrationForm } from "@/components/events/EventRegistrationForm";
import { z } from "zod";
import { Event, RegularUser } from "@/types/database";

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
  const [regularUser, setRegularUser] = useState<RegularUser | null>(null);
  
  useEffect(() => {
    // Check for regular user in localStorage
    const storedUser = localStorage.getItem('regular_user');
    if (storedUser) {
      setRegularUser(JSON.parse(storedUser));
    }
  }, []);
  
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
    queryKey: ['eventRegistration', id, user?.id || regularUser?.id],
    queryFn: async () => {
      if (!id) return false;
      
      // Check if user is registered based on either Supabase auth or regular user
      if (user?.id) {
        const { data, error } = await supabase
          .from('event_registrations')
          .select('id')
          .eq('event_id', id)
          .eq('user_id', user.id)
          .single();

        if (error) return false;
        return !!data;
      } else if (regularUser?.email) {
        const { data, error } = await supabase
          .from('event_registrations')
          .select('id')
          .eq('event_id', id)
          .eq('email', regularUser.email)
          .single();

        if (error) return false;
        return !!data;
      }
      
      return false;
    },
    enabled: !!id && !!(user?.id || regularUser?.id)
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
        toast.error("ID event tidak valid");
        return;
      }
      
      if (!user?.id && !regularUser) {
        toast.error("Anda harus login untuk mendaftar event");
        return;
      }

      // Check if email is already registered
      const isEmailRegistered = await checkEmailRegistered(values.email);
      if (isEmailRegistered) {
        toast.error("Email ini sudah terdaftar pada event ini");
        return;
      }

      const { error } = await supabase
        .from('event_registrations')
        .insert({
          event_id: id,
          user_id: user?.id || null, // Use Supabase user ID if available
          name: values.name,
          email: values.email,
          phone: values.phone,
          university: values.university,
          faculty: values.faculty,
          attendance_status: 'registered',
          registration_date: new Date().toISOString()
        });

      if (error) {
        console.error("Error details:", error);
        
        if (error.code === '23505') {
          toast.error("Anda sudah terdaftar pada event ini");
        } else if (error.message.includes('violates row-level security policy')) {
          toast.error("Gagal mendaftar: Anda tidak memiliki izin untuk mendaftar");
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

  // Get current user info (either from Supabase or regular user)
  const currentUser = user || regularUser;

  return (
    <Layout>
      <EventDetailHeader event={event} />
      
      <div className="container mx-auto px-4 py-12">
        <EventDetailInfo 
          event={event}
          isRegistered={!!isRegistered}
          onRegister={() => setIsRegistrationOpen(true)}
          user={currentUser}
          eventIsFullyBooked={eventIsFullyBooked}
          registrationClosed={registrationClosed}
          allowGuestRegistration={false}
        />
      </div>

      <EventRegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSubmit={handleRegister}
        event={event}
        defaultEmail={currentUser?.email || ""}
      />
    </Layout>
  );
}
