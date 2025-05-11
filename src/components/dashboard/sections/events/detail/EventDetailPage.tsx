
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "sonner";
import { EventForm } from "../EventForm";
import { EventRegistrations } from "../EventRegistrations";
import { useNavigate } from "react-router-dom";
import { Event } from "@/types/database";
import { EventHeader } from "./EventHeader";
import { EventImage } from "./EventImage";
import { EventOverview } from "./EventOverview";
import { EventActions } from "./EventActions";
import { EventStatistics } from "./EventStatistics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EventDetailPageProps {
  eventId: string;
  onBack: () => void;
}

export function EventDetailPage({ eventId, onBack }: EventDetailPageProps) {
  const navigate = useNavigate();
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const { data: event, isLoading, refetch } = useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      
      // Add type assertion to ensure the event conforms to the Event interface
      // This ensures that `type` is treated as 'online' | 'offline'
      return {
        ...data,
        type: data.type === 'online' ? 'online' : 'offline'
      } as Event;
    }
  });

  const handleEditSuccess = () => {
    setIsEditSheetOpen(false);
    refetch();
    toast.success("Event berhasil diperbarui");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-xl font-semibold">Memuat data event...</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-xl font-semibold">Event tidak ditemukan</div>
          <button onClick={onBack} className="mt-4">Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <EventHeader 
        onBack={onBack} 
        onEdit={() => setIsEditSheetOpen(true)} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content Area - Left Side (2/3 width) */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pendaftar Kegiatan</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {event.registered_participants || 0} orang sudah mendaftar untuk kegiatan ini
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <EventRegistrations eventId={event.id} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Right Side (1/3 width) */}
        <div className="space-y-6">
          <EventStatistics 
            event={event}
            onViewRegistrations={() => {}}
            onEdit={() => setIsEditSheetOpen(true)}
          />
        </div>
      </div>

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="w-[90%] sm:max-w-[540px] lg:max-w-[640px] overflow-y-auto max-h-screen">
          <SheetHeader>
            <SheetTitle>Edit Event</SheetTitle>
            <SheetDescription>
              Ubah informasi kegiatan
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <EventForm 
              event={event} 
              onSuccess={handleEditSuccess}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
