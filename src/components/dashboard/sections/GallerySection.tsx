
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function GallerySection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Galeri</h2>
          <p className="text-muted-foreground">
            Kelola koleksi foto dan video dokumentasi kegiatan
          </p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" /> Unggah Media
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manajemen Galeri</CardTitle>
          <CardDescription>
            Unggah, edit, dan hapus foto atau video dokumentasi
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">
              Fitur manajemen galeri akan segera tersedia
            </p>
            <Button>Unggah Media Pertama</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
