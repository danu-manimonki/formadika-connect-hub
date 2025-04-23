
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagesSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pesan</h2>
        <p className="text-muted-foreground">
          Kelola pesan dan kontak dari pengunjung situs
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manajemen Pesan</CardTitle>
          <CardDescription>
            Lihat dan tanggapi pesan dari pengunjung situs
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <div className="text-center">
            <p className="text-muted-foreground">
              Fitur manajemen pesan akan segera tersedia
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
