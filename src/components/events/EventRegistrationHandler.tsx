
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
      const userEmail = regularUser?.email || user?.email;
      if (!userEmail) {
        toast.error("Tidak dapat menemukan email pengguna");
        return;
      }
      
      const isEmailRegistered = await checkEmailRegistered(userEmail);
      if (isEmailRegistered) {
        toast.error("Email ini sudah terdaftar pada event ini");
        return;
      }

      // Get user name based on the user type
      const userName = regularUser?.name || user?.user_metadata?.name || '';
      
      // Prepare registration data
      const registrationData = {
        event_id: eventId,
        user_id: user?.id || null, // Use null for regular users
        name: userName,
        email: userEmail,
        phone: '',  // Default empty since we don't have phone in the user object
        university: regularUser?.university || '',
        faculty: '',  // Default empty since we don't have faculty in the user object
        attendance_status: 'registered'
      };

      // For debugging
      console.log("Registration data:", registrationData);

      const { error } = await supabase
        .from('event_registrations')
        .insert(registrationData);

      if (error) {
        console.error("Error details:", error);
        
        if (error.code === '23505') {
          toast.error("Anda sudah terdaftar pada event ini");
        } else if (error.message.includes('violates row-level security policy')) {
          // For regular users, we'll use an anonymous insert since they might not have permission
          if (regularUser && !user) {
            const anonRegistrationData = { ...registrationData };
            const { error: anonError } = await supabase
              .from('event_registrations')
              .insert(anonRegistrationData);
              
            if (anonError) {
              console.error("Anonymous registration error:", anonError);
              toast.error("Gagal mendaftar: " + anonError.message);
              throw anonError;
            } else {
              // Success with anonymous registration
              // Update registered_participants count
              await supabase.rpc('increment_participants', { event_id: eventId });
              
              // Invalidate related queries
              queryClient.invalidateQueries({ queryKey: ['events'] });
              queryClient.invalidateQueries({ queryKey: ['event', eventId] });
              
              toast.success("Berhasil mendaftar ke event");
              refetchRegistration();
              return;
            }
          } else {
            toast.error("Gagal mendaftar: Anda tidak memiliki izin untuk mendaftar");
          }
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
