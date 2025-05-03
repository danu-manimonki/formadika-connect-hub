import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Event } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { EventFormData } from "./EventForm.types";
import { EventBasicInfo } from "./EventBasicInfo";
import { EventDateTime } from "./EventDateTime";
import { EventTypeDetails } from "./EventTypeDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema } from "./EventForm.schema";
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { EventPreview } from "./EventPreview";

interface EventFormProps {
  event?: Event;
  onSuccess?: () => void;
}

export function EventForm({ event, onSuccess }: EventFormProps) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event ? {
      title: event.title || '',
      description: event.description || '',
      date: event.date || '',
      time: event.time || '',
      location: event.location || '',
      type: event.type,
      participants: event.participants || 0,
      image_url: event.image_url || '',
      is_featured: event.is_featured || false,
      max_participants: event.max_participants || undefined,
      status: (event.status as 'upcoming' | 'ongoing' | 'completed' | 'cancelled') || 'upcoming'
    } : {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'offline',
      participants: 0,
      image_url: '',
      is_featured: false,
      max_participants: undefined,
      status: 'upcoming'
    }
  });

  // Add effect to update form values when event prop changes
  useEffect(() => {
    if (event) {
      form.reset({
        title: event.title || '',
        description: event.description || '',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        type: event.type,
        participants: event.participants || 0,
        image_url: event.image_url || '',
        is_featured: event.is_featured || false,
        max_participants: event.max_participants || undefined,
        status: (event.status as 'upcoming' | 'ongoing' | 'completed' | 'cancelled') || 'upcoming'
      });
    }
  }, [event, form]);

  const onSubmit = async (values: EventFormData) => {
    try {
      console.log("Form submission started with values:", values);
      setIsSubmitting(true);
      
      // Log all form values to debug
      console.log("Complete form data:", form.getValues());
      console.log("Image URL before submission:", values.image_url);
      
      const supabaseData = {
        title: values.title,
        description: values.description,
        date: values.date,
        time: values.time,
        location: values.location,
        type: values.type,
        participants: values.participants,
        image_url: values.image_url, // Use the value from the form values directly
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
      
      if (!event) {
        form.reset();
      }
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Gagal menyimpan event');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
              className="mb-4"
            >
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
          </div>
          
          <EventBasicInfo form={form} />
          <EventDateTime form={form} />
          <EventTypeDetails form={form} />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : event ? 'Perbarui Event' : 'Buat Event'}
          </Button>
        </form>
      </Form>
      
      <EventPreview 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        eventData={form.getValues()}
      />
    </>
  );
}
