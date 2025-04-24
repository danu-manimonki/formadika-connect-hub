import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Event } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ImagePlus } from "lucide-react";

interface EventFormProps {
  event?: Event;
  onSuccess?: () => void;
}

// Update the type to explicitly allow File object
type EventFormData = Omit<Event, 'id' | 'created_at' | 'updated_at'> & {
  image_url: string | File | null;
};

export function EventForm({ event, onSuccess }: EventFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<EventFormData>({
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

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('events')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase
        .storage
        .from('events')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const onSubmit = async (values: EventFormData) => {
    try {
      console.log("Submitting form with values:", values);

      // Handle image upload if file is selected
      // Use a more robust type check
      if (values.image_url && typeof values.image_url !== 'string') {
        // TypeScript now knows image_url is not a string
        const publicUrl = await handleImageUpload(values.image_url as File);
        values.image_url = publicUrl;
      }
      
      if (event?.id) {
        console.log("Updating event with ID:", event.id);
        const { error } = await supabase
          .from('events')
          .update(values)
          .eq('id', event.id);

        if (error) {
          console.error("Supabase update error:", error);
          throw error;
        }
        toast.success('Event updated successfully');
      } else {
        console.log("Creating new event");
        const { error } = await supabase
          .from('events')
          .insert([values]);

        if (error) {
          console.error("Supabase insert error:", error);
          throw error;
        }
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
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Event Image</FormLabel>
              <FormControl>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    {...field}
                  />
                  {value && typeof value === 'string' && (
                    <img 
                      src={value} 
                      alt="Event preview" 
                      className="h-20 w-20 object-cover rounded"
                    />
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload an image for the event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Participants</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                  value={field.value || 0}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full">
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </form>
    </Form>
  );
}
