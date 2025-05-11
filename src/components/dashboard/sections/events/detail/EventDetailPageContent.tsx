
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventStatistics } from "./EventStatistics";
import { EventRegistrations } from "../EventRegistrations";
import { Event } from "@/types/database";

interface EventDetailPageContentProps {
  event: Event;
  onRefresh: () => void;
}

export function EventDetailPageContent({ event, onRefresh }: EventDetailPageContentProps) {
  return (
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
          onEdit={() => onRefresh()}
        />
      </div>
    </div>
  );
}
