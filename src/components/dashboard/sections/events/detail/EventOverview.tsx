
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Mail, MapPin, Users, Wifi, WifiOff } from "lucide-react";
import { Event } from "@/types/database";

interface EventOverviewProps {
  event: Event;
  onViewRegistrations: () => void;
}

export function EventOverview({ event, onViewRegistrations }: EventOverviewProps) {
  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Akan Datang</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-800">Sedang Berlangsung</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Selesai</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <div className="flex gap-2 mt-1">
              <Badge variant={event.type === 'online' ? 'secondary' : 'default'} className="gap-1.5">
                {event.type === 'online' ? (
                  <><Wifi className="h-3 w-3" /> Online</>
                ) : (
                  <><WifiOff className="h-3 w-3" /> Offline</>
                )}
              </Badge>
              {getStatusBadge(event.status)}
              {event.is_featured && (
                <Badge variant="outline" className="bg-yellow-100 border-yellow-200 text-yellow-800">
                  Featured
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Detail Event</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span>
                  {event.registered_participants || 0} terdaftar 
                  {event.max_participants ? ` (Kuota: ${event.max_participants})` : ''}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tentang Event</h3>
            <p className="text-sm">{event.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
