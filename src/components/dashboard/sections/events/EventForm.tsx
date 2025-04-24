
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
import { useState } from "react";

interface EventFormProps {
  event?: Event;
  onSuccess?: () => void;
}

export function EventForm({ event, onSuccess }: EventFormProps) {
  const queryClient = useQueryClient();
  const { handleImageUpload, isUploading } = useEventImageUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event ? {
      title: event.title || '',
      description: event.description || '',
      date: event.date || '',
      time: event.time || '',
      location: event.location || '',
      image_url: event.image_url || null,
      type: event.type as 'online' | 'offline',
      participants: event.participants || 0
    } : {
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
      console.log("Form submission started with values:", values);
      setIsSubmitting(true);
      
      // Create a new object for Supabase that matches what it expects
      const supabaseData: Partial<Event> = {
        title: values.title,
        description: values.description,
        date: values.date,
        time: values.time,
        location: values.location,
        type: values.type,
        participants: values.participants,
        image_url: null  // Initialize as null
      };

      // Handle image upload if it's a File
      if (values.image_url && values.image_url instanceof File) {
        try {
          console.log("Uploading image file...");
          const publicUrl = await handleImageUpload(values.image_url);
          console.log("Image uploaded successfully, URL:", publicUrl);
          supabaseData.image_url = publicUrl;
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          toast.error('Failed to upload image');
          setIsSubmitting(false);
          return;
        }
      } else if (typeof values.image_url === 'string' && values.image_url) {
        // If it's already a string URL, just use it
        supabaseData.image_url = values.image_url;
      }
      
      console.log("Final data to submit:", supabaseData);
      
      if (event?.id) {
        console.log("Updating existing event:", event.id);
        const { error } = await supabase
          .from('events')
          .update(supabaseData)
          .eq('id', event.id);

        if (error) {
          console.error("Update error:", error);
          toast.error('Failed to update event');
          throw error;
        }
        
        console.log("Event updated successfully");
        toast.success('Event updated successfully');
      } else {
        console.log("Creating new event");
        const { error } = await supabase
          .from('events')
          .insert([supabaseData]);

        if (error) {
          console.error("Insert error:", error);
          toast.error('Failed to create event');
          throw error;
        }
        
        console.log("Event created successfully");
        toast.success('Event created successfully');
      }

      // Invalidate and refresh events data
      queryClient.invalidateQueries({ queryKey: ['events'] });
      
      if (onSuccess) {
        console.log("Calling onSuccess callback");
        onSuccess();
      }
      
      // Reset form after successful submission
      if (!event) {
        form.reset();
      }
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EventBasicInfo form={form} />
        <EventDateTime form={form} />
        <EventImageUpload form={form} />
        <EventTypeDetails form={form} />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || isUploading}
        >
          {(isSubmitting || isUploading) ? 'Saving...' : event ? 'Update Event' : 'Create Event'}
        </Button>
      </form>
    </Form>
  );
}
