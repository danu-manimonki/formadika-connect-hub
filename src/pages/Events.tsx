
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, CalendarDays, ArrowRight, Wifi, WifiOff, Bandage } from "lucide-react";

const Events = () => {
  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Workshop Beasiswa Lanjut Studi",
      description: "Workshop ini akan membahas berbagai tips dan strategi untuk mendapatkan beasiswa lanjut studi baik di dalam maupun luar negeri. Pembicara dari alumni yang berhasil mendapatkan beasiswa akan berbagi pengalaman mereka.",
      date: "15 April 2025",
      time: "09:00 - 15:00 WIB",
      location: "Aula Pemda Karanganyar",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      participants: 50,
      type: "offline"
    },
    {
      id: 2,
      title: "Seminar Karir untuk Fresh Graduate",
      description: "Seminar online yang membahas persiapan dunia kerja, strategi mencari pekerjaan, dan tips menghadapi interview untuk mahasiswa tingkat akhir dan fresh graduate.",
      date: "20 April 2025",
      time: "13:00 - 16:00 WIB",
      location: "Zoom Meeting",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      participants: 100,
      type: "online"
    },
    {
      id: 3,
      title: "Pengabdian Masyarakat Desa Binaan",
      description: "Kegiatan pengabdian masyarakat berupa bimbingan belajar gratis dan penyuluhan kesehatan di desa binaan FORMADIKA di Karangpandan.",
      date: "28 April 2025",
      time: "08:00 - 16:00 WIB",
      location: "Desa Karangpandan, Karanganyar",
      image: "https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
      participants: 35,
      type: "offline"
    },
    {
      id: 4,
      title: "Webinar Penulisan Jurnal Ilmiah",
      description: "Webinar yang membahas teknik dan kiat-kiat menulis jurnal ilmiah yang baik untuk publikasi, dibawakan oleh dosen dan peneliti berpengalaman.",
      date: "5 Mei 2025",
      time: "19:00 - 21:00 WIB",
      location: "Google Meet",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      participants: 75,
      type: "online"
    }
  ];

  // Mock past events
  const pastEvents = [
    {
      id: 101,
      title: "Temu Alumni FORMADIKA 2024",
      description: "Acara gathering tahunan yang mempertemukan alumni FORMADIKA dari berbagai angkatan untuk berbagi pengalaman dan memperkuat jaringan.",
      date: "15 Februari 2025",
      time: "10:00 - 16:00 WIB",
      location: "Hotel Grand Tjokro Karanganyar",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      participants: 120,
      type: "offline"
    },
    {
      id: 102,
      title: "Sosialisasi Beasiswa KIP-K 2025",
      description: "Kegiatan sosialisasi program beasiswa KIP-K untuk siswa SMA/SMK di Kabupaten Karanganyar yang akan melanjutkan pendidikan ke perguruan tinggi.",
      date: "20 Januari 2025",
      time: "09:00 - 12:00 WIB",
      location: "SMA Negeri 1 Karanganyar",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      participants: 200,
      type: "offline"
    },
    {
      id: 103,
      title: "Workshop Pengembangan Soft Skills",
      description: "Workshop yang fokus pada pengembangan soft skills seperti leadership, communication, dan teamwork yang dipandu oleh trainer profesional.",
      date: "10 Desember 2024",
      time: "09:00 - 16:00 WIB",
      location: "Co-Working Space Karanganyar",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      participants: 50,
      type: "offline"
    }
  ];

  const EventCard = ({ event }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              event.type === 'online' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {event.type === 'online' ? (
                <><Wifi size={14} /> Online</>
              ) : (
                <><WifiOff size={14} /> Offline</>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-xl mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
          <div className="space-y-2 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-2" />
              <span>{event.participants} peserta</span>
            </div>
          </div>
          <Button asChild className="w-full">
            <Link to={`/events/${event.id}`}>Detail Acara</Link>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <section className="bg-formadika-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Kegiatan
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Agenda Kegiatan FORMADIKA
            </h1>
            <p className="text-xl text-formadika-50">
              Ikuti berbagai kegiatan menarik yang diselenggarakan oleh FORMADIKA Karanganyar untuk mengembangkan diri dan memperluas jaringan.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-formadika-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">Jadwal Kegiatan</h2>
              <p className="text-gray-600">Temukan kegiatan-kegiatan yang diselenggarakan FORMADIKA</p>
            </div>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/calendar"><CalendarDays size={16} /> Lihat Kalender</Link>
            </Button>
          </div>
          
          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Kegiatan Mendatang</TabsTrigger>
              <TabsTrigger value="past">Kegiatan Sebelumnya</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <a href="#">Lihat Lebih Banyak <ArrowRight size={16} className="ml-2" /></a>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-white p-8 rounded-lg shadow-md mt-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-2 text-formadika-teal">Ingin Mengusulkan Kegiatan?</h3>
                <p className="text-gray-600 mb-4">
                  FORMADIKA membuka kesempatan bagi anggota untuk mengusulkan kegiatan yang bermanfaat bagi komunitas dan masyarakat Karanganyar.
                </p>
                <Button asChild>
                  <Link to="/contact">Ajukan Usulan</Link>
                </Button>
              </div>
              <div className="md:w-1/3">
                <img 
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                  alt="Proposal Kegiatan"
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
