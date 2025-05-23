
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ArticlesSection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Artikel</h2>
          <p className="text-muted-foreground">
            Kelola konten artikel untuk situs web organisasi
          </p>
        </div>
        <Button className="gap-1">
          <Plus className="h-4 w-4" /> Tambah Artikel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manajemen Artikel</CardTitle>
          <CardDescription>
            Tambah, edit, dan hapus artikel FORMADIKA
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">
              Fitur manajemen artikel akan segera tersedia
            </p>
            <Button>Tambah Artikel Pertama</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
