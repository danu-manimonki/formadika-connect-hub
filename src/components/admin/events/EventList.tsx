
import { CalendarDays, Edit, Eye, Trash2 } from "lucide-react";
import { Event } from "@/types/database";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { EventForm } from "./EventForm";

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Event deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    } catch (error) {
      toast.error('Failed to delete event');
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event.id} className="flex items-start justify-between p-4 border rounded-lg">
          <div className="space-y-1">
            <h3 className="font-medium">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>
                {format(new Date(event.date), 'PPP')} at {event.time}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{event.title}</DialogTitle>
                  <DialogDescription>Event Details</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p>{event.description}</p>
                  <div className="space-y-2">
                    <p><strong>Date:</strong> {format(new Date(event.date), 'PPP')}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Type:</strong> {event.type}</p>
                    <p><strong>Max Participants:</strong> {event.participants}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Sheet open={editingEvent?.id === event.id} onOpenChange={(open) => !open && setEditingEvent(null)}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setEditingEvent(event)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Event</SheetTitle>
                  <SheetDescription>Make changes to this event</SheetDescription>
                </SheetHeader>
                <EventForm 
                  event={editingEvent!} 
                  onSuccess={() => setEditingEvent(null)} 
                />
              </SheetContent>
            </Sheet>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Event</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this event? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => handleDelete(event.id)}>
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
}
