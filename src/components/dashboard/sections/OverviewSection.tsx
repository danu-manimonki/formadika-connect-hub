
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  CalendarDays, 
  BookOpenText, 
  Heart, 
  Image, 
  Mail 
} from 'lucide-react';

export default function OverviewSection() {
  const stats = [
    {
      title: "Total Anggota",
      value: "124",
      description: "Anggota aktif dan alumni",
      icon: Users,
      change: "+4%",
      changeType: "increase"
    },
    {
      title: "Kegiatan",
      value: "12",
      description: "Periode tahun ini",
      icon: CalendarDays,
      change: "+2",
      changeType: "increase"
    },
    {
      title: "Artikel",
      value: "34",
      description: "Total artikel dipublikasikan",
      icon: BookOpenText,
      change: "+3",
      changeType: "increase"
    },
    {
      title: "Donasi",
      value: "Rp 12.5jt",
      description: "Total donasi diterima",
      icon: Heart,
      change: "+8%",
      changeType: "increase"
    },
    {
      title: "Galeri",
      value: "87",
      description: "Total foto kegiatan",
      icon: Image,
      change: "+5",
      changeType: "increase"
    },
    {
      title: "Pesan",
      value: "8",
      description: "Pesan belum terbaca",
      icon: Mail,
      change: "-2",
      changeType: "decrease"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Selamat datang di panel manajemen FORMADIKA Karanganyar
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className={`text-xs mt-2 ${stat.changeType === "increase" ? "text-green-500" : "text-red-500"}`}>
                {stat.change} dari periode sebelumnya
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              5 aktivitas terbaru yang dilakukan di sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Artikel baru ditambahkan</p>
                  <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Anggota baru terdaftar</p>
                  <p className="text-xs text-muted-foreground">3 jam yang lalu</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Kegiatan baru dijadwalkan</p>
                  <p className="text-xs text-muted-foreground">5 jam yang lalu</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Donasi baru diterima</p>
                  <p className="text-xs text-muted-foreground">1 hari yang lalu</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Foto baru ditambahkan ke galeri</p>
                  <p className="text-xs text-muted-foreground">2 hari yang lalu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Pengingat</CardTitle>
            <CardDescription>
              Kegiatan yang akan datang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium">Rapat Pengurus</h4>
                <p className="text-sm text-muted-foreground">Kamis, 25 April 2025</p>
                <p className="text-sm">Sekretariat FORMADIKA</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium">Webinar Kepemimpinan</h4>
                <p className="text-sm text-muted-foreground">Sabtu, 3 Mei 2025</p>
                <p className="text-sm">Platform Zoom</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium">Bakti Sosial</h4>
                <p className="text-sm text-muted-foreground">Minggu, 11 Mei 2025</p>
                <p className="text-sm">Desa Jatipuro</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
