
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/database";
import { useEventsQuery } from "@/hooks/queries/events/useEventsQuery";
import { formatDate } from "@/lib/utils";

export function UpcomingEventsNotification() {
  const { data: events, isLoading } = useEventsQuery();
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (events) {
      // Filter events yang akan datang dalam 7 hari ke depan
      const now = new Date();
      const next7Days = new Date();
      next7Days.setDate(now.getDate() + 7);

      const upcoming = events.filter(event => {
        if (event.status !== 'upcoming') return false;
        
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= next7Days;
      });

      setUpcomingEvents(upcoming);
    }
  }, [events]);

  if (isLoading) {
    return (
      <Card className="bg-slate-50">
        <CardContent className="p-4">
          <div className="text-center text-sm text-muted-foreground">
            Memuat notifikasi...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (upcomingEvents.length === 0) {
    return null; // Tidak tampilkan card jika tidak ada event yang akan datang
  }

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-base flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-500" />
          <span>Event Mendatang</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <div className="space-y-2">
          {upcomingEvents.map(event => (
            <div key={event.id} className="text-sm p-2 bg-white rounded-md border border-blue-100">
              <div className="font-medium">{event.title}</div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatDate(event.date)}</span>
                <span>{event.time}</span>
              </div>
              <div className="text-xs text-muted-foreground">{event.location}</div>
            </div>
          ))}
          
          <Button variant="link" size="sm" className="text-xs text-blue-600 p-0 h-auto">
            Lihat Semua Event
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
