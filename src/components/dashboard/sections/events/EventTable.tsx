
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { Event } from "@/types/database";
import { formatDate } from "@/lib/utils";

interface EventTableProps {
  isLoading: boolean;
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

export function EventTable({ 
  isLoading, 
  events, 
  onEdit, 
  onDelete 
}: EventTableProps) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center py-4">
          Loading...
        </TableCell>
      </TableRow>
    );
  }

  if (events.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
          Tidak ada kegiatan yang sesuai filter
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {events.map((event) => (
        <TableRow key={event.id}>
          <TableCell className="font-medium">{event.title}</TableCell>
          <TableCell>{formatDate(event.date)}</TableCell>
          <TableCell>{event.time}</TableCell>
          <TableCell>{event.location}</TableCell>
          <TableCell>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              event.type === "online" 
                ? "bg-blue-100 text-blue-800" 
                : "bg-green-100 text-green-800"
            }`}>
              {event.type === "online" ? "Online" : "Offline"}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
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
