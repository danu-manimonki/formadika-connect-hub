
import { useState } from 'react';
import { CalendarDays, Edit, Eye, Trash2 } from "lucide-react";
import { Event } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { EventForm } from "./EventForm";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting event with ID:", id);
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Supabase delete error:", error);
        throw error;
      }

      toast.success('Event deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setDeletingEventId(null);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    setEditingEvent(null);
  };

  const confirmingEvent = deletingEventId ? events.find(event => event.id === deletingEventId) : null;

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md"
        >
          <div className="space-y-2 mb-3 md:mb-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium">{event.title}</h3>
              <Badge variant={event.type === 'online' ? 'secondary' : 'default'}>
                {event.type === 'online' ? 'Online' : 'Offline'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>
                {event.date} at {event.time} • {event.location}
              </span>
            </div>
          </div>
          <div className="flex space-x-2 w-full md:w-auto">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" /> View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setEditingEvent(event);
                setIsEditing(true);
              }}
            >
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setDeletingEventId(event.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </div>
      ))}

      {/* Edit Event Sheet */}
      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent className="w-[90%] sm:max-w-[540px] lg:max-w-[640px]">
          <SheetHeader>
            <SheetTitle>Edit Event</SheetTitle>
            <SheetDescription>
              Make changes to the event details
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            {editingEvent && <EventForm event={editingEvent} onSuccess={handleEditSuccess} />}
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingEventId} onOpenChange={(open) => !open && setDeletingEventId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the event "{confirmingEvent?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deletingEventId && handleDelete(deletingEventId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
