
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
import { EventOverview } from "./EventOverview";
import { EventActions } from "./EventActions";
import { EventStatistics } from "./EventStatistics";
import { EventImage } from "./EventImage";

interface EventDetailPageProps {
  eventId: string;
  onBack: () => void;
}

export function EventDetailPage({ eventId, onBack }: EventDetailPageProps) {
  const navigate = useNavigate();
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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

  const handleViewRegistrations = () => {
    setActiveTab("registrations");
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
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Informasi Event</TabsTrigger>
              <TabsTrigger value="registrations">Pendaftar ({event.registered_participants || 0})</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <EventOverview 
                event={event} 
                onViewRegistrations={handleViewRegistrations} 
              />
              <EventActions onViewRegistrations={handleViewRegistrations} />
            </TabsContent>
            
            <TabsContent value="registrations">
              <EventRegistrations eventId={event.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <EventStatistics 
            event={event}
            onViewRegistrations={handleViewRegistrations}
            onEdit={() => setIsEditSheetOpen(true)}
          />
          
          {/* Event Image moved below the Statistics section */}
          <EventImage 
            imageUrl={event.image_url} 
            title={event.title} 
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
