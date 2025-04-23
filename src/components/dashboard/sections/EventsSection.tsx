
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function EventsSection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Kegiatan</h2>
          <p className="text-muted-foreground">
            Kelola jadwal dan informasi kegiatan organisasi
          </p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" /> Tambah Kegiatan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manajemen Kegiatan</CardTitle>
          <CardDescription>
            Tambah, edit, dan hapus informasi kegiatan FORMADIKA
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">
              Fitur manajemen kegiatan akan segera tersedia
            </p>
            <Button>Tambah Kegiatan Pertama</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
