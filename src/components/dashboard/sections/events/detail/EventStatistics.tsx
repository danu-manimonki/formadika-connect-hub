
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Event } from "@/types/database";
import { Mail, Share, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EventStatisticsProps {
  event: Event;
  onViewRegistrations: () => void;
  onEdit: () => void;
}

export function EventStatistics({ event, onViewRegistrations, onEdit }: EventStatisticsProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Statistik Event</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Pendaftar</span>
                <span className="font-medium">
                  {event.registered_participants || 0}
                  {event.max_participants ? ` / ${event.max_participants}` : ''}
                </span>
              </div>
              {event.max_participants && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-formadika-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${Math.min(
                        ((event.registered_participants || 0) / event.max_participants) * 100, 
                        100
                      )}%` 
                    }}
                  ></div>
                </div>
              )}
            </div>
            
            <div className="pt-2 border-t">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" onClick={onViewRegistrations}>
                  Lihat Pendaftar
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate(`/events/${event.id}`)}>
                  Lihat Publik
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Aksi Cepat</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" /> Kirim Email Pengumuman
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Share className="h-4 w-4 mr-2" /> Bagikan Event
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" /> Edit Informasi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
