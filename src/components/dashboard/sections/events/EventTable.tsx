
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Eye, Wifi, WifiOff } from "lucide-react";
import { Event } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface EventTableProps {
  isLoading: boolean;
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export function EventTable({ 
  isLoading, 
  events, 
  onEdit, 
  onDelete,
  onView
}: EventTableProps) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={8} className="text-center py-4">
          Loading...
        </TableCell>
      </TableRow>
    );
  }

  if (events.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
          Tidak ada kegiatan yang sesuai filter
        </TableCell>
      </TableRow>
    );
  }

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Akan Datang</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-800">Berlangsung</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Selesai</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      {events.map((event) => (
        <TableRow key={event.id}>
          <TableCell>
            {event.image_url ? (
              <div className="relative h-16 w-24 overflow-hidden rounded-md">
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
                {event.is_featured && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-[10px] px-1 py-0.5">
                    Featured
                  </div>
                )}
              </div>
            ) : (
              <div className="h-16 w-24 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                No Image
              </div>
            )}
          </TableCell>
          <TableCell className="font-medium">{event.title}</TableCell>
          <TableCell>{formatDate(event.date)}</TableCell>
          <TableCell>{event.time}</TableCell>
          <TableCell>{event.location}</TableCell>
          <TableCell>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
              event.type === "online" 
                ? "bg-blue-100 text-blue-800" 
                : "bg-green-100 text-green-800"
            }`}>
              {event.type === "online" ? (
                <><Wifi size={12} /> Online</>
              ) : (
                <><WifiOff size={12} /> Offline</>
              )}
            </span>
          </TableCell>
          <TableCell>
            {getStatusBadge(event.status)}
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="icon" onClick={() => onView(event.id)}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onEdit(event)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(event.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
