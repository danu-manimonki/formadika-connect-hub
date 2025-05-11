
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types/database";
import { Mail, Share, Edit, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface EventStatisticsProps {
  event: Event;
  onViewRegistrations: () => void;
  onEdit: () => void;
}

export function EventStatistics({ event, onViewRegistrations, onEdit }: EventStatisticsProps) {
  const navigate = useNavigate();
  
  // Get accurate registration count for this event
  const { data: registrationCount = 0, isLoading } = useQuery({
    queryKey: ['eventRegistrationCount', event.id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('event_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', event.id);
      
      if (error) {
        console.error("Error fetching event registration count:", error);
        return 0;
      }
      
      // If count was successful, update the event's registered_participants count in the database
      if (count !== null && count !== event.registered_participants) {
        await supabase
          .from('events')
          .update({ registered_participants: count })
          .eq('id', event.id);
      }
      
      return count || 0;
    }
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Statistik Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pendaftar</span>
              <span className="font-medium">
                {isLoading ? '...' : registrationCount}
                {event.max_participants ? ` / ${event.max_participants}` : ''}
              </span>
            </div>
            {event.max_participants && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-formadika-600 h-2.5 rounded-full" 
                  style={{ 
                    width: `${Math.min(
                      ((isLoading ? 0 : registrationCount) / event.max_participants) * 100, 
                      100
                    )}%` 
                  }}
                ></div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={onViewRegistrations}
            >
              Lihat Pendaftar
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate(`/events/${event.id}`)}
            >
              Lihat Publik
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Mail className="h-4 w-4 mr-2" /> Kirim Email Pengumuman
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Share className="h-4 w-4 mr-2" /> Bagikan Event
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" /> Edit Informasi
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
