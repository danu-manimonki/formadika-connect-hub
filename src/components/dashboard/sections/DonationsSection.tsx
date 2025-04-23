
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DonationsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Donasi</h2>
        <p className="text-muted-foreground">
          Kelola dan pantau data donasi yang diterima
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manajemen Donasi</CardTitle>
          <CardDescription>
            Lihat dan kelola catatan donasi yang masuk
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-10">
          <div className="text-center">
            <p className="text-muted-foreground">
              Fitur manajemen donasi akan segera tersedia
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
