
import { useState } from "react";
import { EventHeader } from "./EventHeader";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { EventForm } from "../EventForm";
import { Event } from "@/types/database";
import { toast } from "sonner";

interface EventDetailPageHeaderProps {
  event: Event;
  onBack: () => void;
  onSuccess: () => void;
}

export function EventDetailPageHeader({ event, onBack, onSuccess }: EventDetailPageHeaderProps) {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  
  const handleEditSuccess = () => {
    setIsEditSheetOpen(false);
    onSuccess();
    toast.success("Event berhasil diperbarui");
  };

  return (
    <>
      <EventHeader 
        onBack={onBack} 
        onEdit={() => setIsEditSheetOpen(true)} 
      />

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
    </>
  );
}
