
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Event } from '@/types/database';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { EventForm } from './events/EventForm';
import { EventList } from './events/EventList';

export default function EventsManager() {
  const [isCreating, setIsCreating] = useState(false);

  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      // Using a more generic approach that doesn't rely on TypeScript table definitions
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false }) as { data: Event[] | null, error: any };

      if (error) {
        toast.error('Failed to fetch events');
        throw error;
      }

      return data as Event[];
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Events Management</CardTitle>
          <CardDescription>Loading events...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Events Management</CardTitle>
          <CardDescription>Create, view, edit, and delete community events</CardDescription>
        </div>
        <Sheet open={isCreating} onOpenChange={setIsCreating}>
          <SheetTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" /> Add Event
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Event</SheetTitle>
              <SheetDescription>
                Create a new event for the community
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <EventForm onSuccess={() => setIsCreating(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </CardHeader>
      <CardContent>
        {events?.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            No events found. Create your first event!
          </p>
        ) : (
          <EventList events={events} />
        )}
      </CardContent>
    </Card>
  );
}
