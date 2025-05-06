
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { RegularUser } from "@/types/database";
import { useQueryClient } from "@tanstack/react-query";

interface EventRegistrationHandlerProps {
  eventId: string;
  isRegistered: boolean;
  refetchRegistration: () => void;
}

export function EventRegistrationHandler({ 
  eventId, 
  isRegistered, 
  refetchRegistration 
}: EventRegistrationHandlerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const [regularUser, setRegularUser] = useState<RegularUser | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check for regular user in localStorage
    const storedUser = localStorage.getItem('regular_user');
    if (storedUser) {
      setRegularUser(JSON.parse(storedUser));
    }
  }, []);

  // Check if email is already registered (even without login)
  const checkEmailRegistered = async (email: string): Promise<boolean> => {
    if (!eventId) return false;
    
    const { data, error } = await supabase
      .from('event_registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('email', email)
      .single();
      
    return error ? false : !!data;
  };

  // Direct registration without form
  const handleDirectRegister = async () => {
    try {
      setIsLoading(true);
      
      if (!eventId) {
        toast.error("ID event tidak valid");
        return;
      }
      
      const currentUser = user || regularUser;
      
      if (!currentUser) {
        toast.error("Anda harus login untuk mendaftar event");
        return;
      }
      
      // Check if already registered
      if (isRegistered) {
        toast.info("Anda sudah terdaftar pada event ini");
        return;
      }

      // Check if email is already registered
      const isEmailRegistered = await checkEmailRegistered(currentUser.email);
      if (isEmailRegistered) {
        toast.error("Email ini sudah terdaftar pada event ini");
        return;
      }

      // Prepare registration data
      const registrationData = {
        event_id: eventId,
        user_id: user?.id || null,
        name: regularUser?.name || user?.user_metadata?.name || '',
        email: regularUser?.email || user?.email || '',
        phone: '',  // Default empty since we don't have phone in the user object
        university: regularUser?.university || '',
        faculty: '',  // Default empty since we don't have faculty in the user object
        attendance_status: 'registered',
        registration_date: new Date().toISOString()
      };

      const { error } = await supabase
        .from('event_registrations')
        .insert(registrationData);

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
      await supabase.rpc('increment_participants', { event_id: eventId });
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
      
      toast.success("Berhasil mendaftar ke event");
      refetchRegistration();
    } catch (error) {
      console.error("Error registering to event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDirectRegister, isLoading };
}
