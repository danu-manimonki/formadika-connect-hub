
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

      if (values.image_url && typeof values.image_url !== 'string') {
        const publicUrl = await handleImageUpload(values.image_url as File);
        values.image_url = publicUrl;
      }
      
      if (event?.id) {
        const { error } = await supabase
          .from('events')
          .update(values)
          .eq('id', event.id);

        if (error) throw error;
        toast.success('Event updated successfully');
      } else {
        const { error } = await supabase
          .from('events')
          .insert([values]);

        if (error) throw error;
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
