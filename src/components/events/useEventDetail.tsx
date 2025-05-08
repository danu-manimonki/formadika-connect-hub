
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Event, RegularUser } from "@/types/database";

export function useEventDetail(eventId: string | undefined) {
  const { user } = useAuth();
  const [regularUser, setRegularUser] = useState<RegularUser | null>(null);
  
  useEffect(() => {
    // Check for regular user in localStorage
    const storedUser = localStorage.getItem('regular_user');
    if (storedUser) {
      setRegularUser(JSON.parse(storedUser));
    }
  }, []);
  
  const { data: event, isLoading: eventLoading } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      if (!eventId) return null;
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      
      return {
        ...data,
        type: data.type === 'online' ? 'online' : 'offline'
      } as Event;
    }
  });

  const { data: isRegistered, refetch: refetchRegistration } = useQuery({
    queryKey: ['eventRegistration', eventId, user?.id || regularUser?.email],
    queryFn: async () => {
      if (!eventId) return false;
      
      // For debugging - log which user we're checking
      console.log("Checking registration for:", 
        user ? `Auth user ID: ${user.id}` : 
        regularUser ? `Regular user email: ${regularUser.email}` : 
        "No user found");
      
      // Check if user is registered based on either Supabase auth or regular user
      if (user?.id) {
        const { data, error } = await supabase
          .from('event_registrations')
          .select('id')
          .eq('event_id', eventId)
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.log("Auth user registration check error:", error);
          return false;
        }
        console.log("Auth user registration found:", data);
        return !!data;
      } else if (regularUser?.email) {
        const { data, error } = await supabase
          .from('event_registrations')
          .select('id')
          .eq('event_id', eventId)
          .eq('email', regularUser.email)
          .single();

        if (error) {
          console.log("Regular user registration check error:", error);
          return false;
        }
        console.log("Regular user registration found:", data);
        return !!data;
      }
      
      return false;
    },
    enabled: !!eventId && !!(user?.id || regularUser?.email),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0 // Don't cache the result
  });

  // Get current user info (either from Supabase or regular user)
  const currentUser = user || regularUser;

  return {
    event,
    eventLoading,
    isRegistered,
    currentUser,
    refetchRegistration
  };
}
