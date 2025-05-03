
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Event } from "@/types/database";
import { EventFormData } from "@/components/dashboard/sections/events/EventForm.types";

export function useEventSubmit(event?: Event, onSuccess?: () => void) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (values: EventFormData) => {
    try {
      console.log("Form submission started with values:", values);
      setIsSubmitting(true);
      
      // Log all form values to debug
      console.log("Complete form data:", values);
      console.log("Image URL before submission:", values.image_url);
      
      const supabaseData = {
        title: values.title,
        description: values.description,
        date: values.date,
        time: values.time,
        location: values.location,
        type: values.type,
        participants: values.participants,
        image_url: values.image_url,
        is_featured: values.is_featured,
        max_participants: values.max_participants,
        status: values.status
      };
      
      console.log("Final data to submit:", supabaseData);
      
      if (event?.id) {
        const { error } = await supabase
          .from('events')
          .update(supabaseData)
          .eq('id', event.id);

        if (error) {
          console.error("Update error:", error);
          toast.error('Gagal memperbarui event');
          throw error;
        }
        
        console.log("Event updated successfully");
        toast.success('Event berhasil diperbarui');
      } else {
        const { error } = await supabase
          .from('events')
          .insert(supabaseData);

        if (error) {
          console.error("Insert error:", error);
          toast.error('Gagal membuat event');
          throw error;
        }
        
        console.log("Event created successfully");
        toast.success('Event berhasil dibuat');
      }

      queryClient.invalidateQueries({ queryKey: ['events'] });
      
      if (onSuccess) {
        console.log("Calling onSuccess callback");
        onSuccess();
      }
      
      return true;
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Gagal menyimpan event');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
}
