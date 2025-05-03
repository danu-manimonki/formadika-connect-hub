
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Event } from "@/types/database";

interface EventDetailHeaderProps {
  event: Event;
}

export function EventDetailHeader({ event }: EventDetailHeaderProps) {
  return (
    <div className="bg-formadika-600 py-16 text-white">
      <div className="container mx-auto px-4">
        <Link to="/events" className="inline-flex items-center text-formadika-50 hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Kegiatan
        </Link>
        <div className="max-w-3xl">
          <div className="flex gap-2 mb-2">
            <Badge className={event.type === "online" ? "bg-blue-200 text-blue-800" : "bg-green-200 text-green-800"}>
              {event.type === "online" ? "Online" : "Offline"}
            </Badge>
            {event.status && (
              <Badge variant={event.status === "cancelled" ? "destructive" : "secondary"}>
                {event.status === "upcoming" ? "Akan Datang" : 
                 event.status === "ongoing" ? "Sedang Berlangsung" : 
                 event.status === "completed" ? "Selesai" : "Dibatalkan"}
              </Badge>
            )}
          </div>
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        </div>
      </div>
    </div>
  );
}
