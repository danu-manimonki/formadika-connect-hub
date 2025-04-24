
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Event } from "@/types/database";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EventFilters } from "./events/EventFilters";
import { EventTable } from "./events/EventTable";
import { EventForm } from "@/components/admin/events/EventForm";

export default function EventsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const { data: events, isLoading, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      console.log("Fetching events...");
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase fetch error:", error);
        toast.error('Failed to fetch events');
        throw error;
      }

      console.log("Events fetched:", data);
      
      return data as Event[];
    }
  });

  const handleCreateSuccess = () => {
    setIsCreating(false);
    setEditingEvent(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Event deleted successfully');
      refetch();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const filteredEvents = events?.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === "all") return matchesSearch;
    return matchesSearch && event.type === filter;
  }) || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Kegiatan</h2>
        <p className="text-muted-foreground">
          Kelola data kegiatan organisasi
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Daftar Kegiatan</CardTitle>
            <CardDescription>
              Manajemen data kegiatan yang akan atau sudah dilaksanakan
            </CardDescription>
          </div>
          <Sheet open={isCreating || !!editingEvent} 
            onOpenChange={(open) => {
              if (!open) {
                setEditingEvent(null);
              }
              setIsCreating(open);
            }}>
            <SheetTrigger asChild>
              <Button className="gap-1">
                <Plus className="h-4 w-4" /> Tambah Kegiatan
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{editingEvent ? "Edit Kegiatan" : "Tambah Kegiatan Baru"}</SheetTitle>
                <SheetDescription>
                  {editingEvent ? "Edit informasi kegiatan" : "Tambahkan data kegiatan baru"}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <EventForm 
                  event={editingEvent} 
                  onSuccess={handleCreateSuccess}
                />
              </div>
            </SheetContent>
          </Sheet>
        </CardHeader>
        <CardContent>
          <EventFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filter={filter}
            onFilterChange={setFilter}
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <EventTable
                  isLoading={isLoading}
                  events={filteredEvents}
                  onEdit={setEditingEvent}
                  onDelete={handleDelete}
                />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
