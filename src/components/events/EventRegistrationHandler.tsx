
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

// Extend the Supabase client type to include our custom RPC function
declare module '@supabase/supabase-js' {
  interface SupabaseClient {
    rpc<T = any>(
      fn: "add_admin_role" | "has_role" | "increment_participants" | "insert_regular_user" | "is_admin" | "register_event_anonymous",
      params?: object,
      options?: object
    ): { data: T; error: Error | null };
  }
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
      const userName = regularUser?.name || (user?.user_metadata?.name as string) || '';
      
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

      console.log("Registration data:", registrationData);

      // We'll use a more direct approach instead of trying the authenticated route first
      try {
        if (user) {
          // For authenticated users, use standard insert
          const { error } = await supabase
            .from('event_registrations')
            .insert(registrationData);

          if (error) {
            if (error.code === '23505') { // PostgreSQL unique violation code
              toast.error("Anda sudah terdaftar pada event ini");
              return;
            }
            throw error;
          }
        } else if (regularUser) {
          // For regular users, use RPC function for anonymous insert
          const { error } = await supabase.rpc("register_event_anonymous", {
            p_event_id: eventId,
            p_name: userName,
            p_email: userEmail,
            p_university: regularUser.university || '',
            p_faculty: ''
          });
                
          if (error) {
            if (error.message?.includes("duplicate key") || error.code === '23505') {
              toast.error("Email ini sudah terdaftar pada event ini");
              return;
            }
            throw error;
          }
        } else {
          toast.error("Tidak dapat mendaftar: Data pengguna tidak ditemukan");
          return;
        }

        // Update registered_participants count
        await supabase.rpc('increment_participants', { event_id: eventId });
        
        // Invalidate related queries to ensure fresh data
        queryClient.invalidateQueries({ queryKey: ['events'] });
        queryClient.invalidateQueries({ queryKey: ['event', eventId] });
        queryClient.invalidateQueries({ queryKey: ['eventRegistration', eventId] });
        queryClient.invalidateQueries({ queryKey: ['eventRegistrations', eventId] });
        
        toast.success("Berhasil mendaftar ke event");
        refetchRegistration();
      } catch (error: any) {
        console.error("Error during registration:", error);
        // Handle any other errors that weren't caught by specific conditions
        if (error.message?.includes("duplicate key")) {
          toast.error("Email ini sudah terdaftar pada event ini");
        } else {
          toast.error(`Gagal mendaftar: ${error.message}`);
        }
      }
    } catch (error: any) {
      console.error("Error registering to event:", error);
      toast.error(`Gagal mendaftar: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleDirectRegister, isLoading };
}
