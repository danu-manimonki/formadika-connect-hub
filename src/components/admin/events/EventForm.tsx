
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Event } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { EventFormData } from "./EventForm.types";
import { useEventImageUpload } from "@/hooks/useEventImageUpload";
import { EventBasicInfo } from "./EventBasicInfo";
import { EventDateTime } from "./EventDateTime";
import { EventImageUpload } from "./EventImageUpload";
import { EventTypeDetails } from "./EventTypeDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema } from "./EventForm.schema";

interface EventFormProps {
  event?: Event;
  onSuccess?: () => void;
}

export function EventForm({ event, onSuccess }: EventFormProps) {
  const queryClient = useQueryClient();
  const { handleImageUpload } = useEventImageUpload();
  
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event || {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      image_url: null,
      type: 'offline',
      participants: 0
    }
  });

  const onSubmit = async (values: EventFormData) => {
    try {
      console.log("Submitting form with values:", values);
      
      // Create a new object for Supabase that matches what it expects
      const supabaseData: Omit<Event, 'id' | 'created_at' | 'updated_at'> = {
        title: values.title,
        description: values.description,
        date: values.date,
        time: values.time,
        location: values.location,
        type: values.type as 'online' | 'offline',
        participants: values.participants,
        image_url: null  // Initialize as null
      };

      // Handle image upload if it's a File
      if (values.image_url && values.image_url instanceof File) {
        try {
          const publicUrl = await handleImageUpload(values.image_url);
          supabaseData.image_url = publicUrl;
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          toast.error('Failed to upload image');
          return;
        }
      } else if (typeof values.image_url === 'string' && values.image_url) {
        // If it's already a string URL, just use it
        supabaseData.image_url = values.image_url;
      }
      
      if (event?.id) {
        const { error } = await supabase
          .from('events')
          .update(supabaseData)
          .eq('id', event.id);

        if (error) {
          console.error("Update error:", error);
          throw error;
        }
        toast.success('Event updated successfully');
      } else {
        const { error, data } = await supabase
          .from('events')
          .insert([supabaseData])
          .select();

        if (error) {
          console.error("Insert error:", error);
          throw error;
        }
        console.log("Created event:", data);
        toast.success('Event created successfully');
      }

      queryClient.invalidateQueries({ queryKey: ['events'] });
      onSuccess?.();
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EventBasicInfo form={form} />
        <EventDateTime form={form} />
        <EventImageUpload form={form} />
        <EventTypeDetails form={form} />
        
        <Button type="submit" className="w-full">
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </form>
    </Form>
  );
}
