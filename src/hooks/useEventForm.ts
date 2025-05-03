
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventFormSchema } from "@/components/dashboard/sections/events/EventForm.schema";
import { EventFormData } from "@/components/dashboard/sections/events/EventForm.types";
import { Event } from "@/types/database";

export function useEventForm(event?: Event, onSuccess?: () => void) {
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

  // Update form values when event prop changes
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

  return {
    form,
    isSubmitting,
    setIsSubmitting,
    isPreviewOpen,
    setIsPreviewOpen
  };
}
