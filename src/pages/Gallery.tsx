
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Mock photo data
  const photos = [
    {
      id: 1,
      title: "Temu Alumni FORMADIKA 2024",
      date: "15 Februari 2025",
      image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      category: "alumni"
    },
    {
      id: 2,
      title: "Sosialisasi Beasiswa KIP-K 2025",
      date: "20 Januari 2025",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "education"
    },
    {
      id: 3,
      title: "Workshop Pengembangan Soft Skills",
      date: "10 Desember 2024",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      category: "workshop"
    },
    {
      id: 4,
      title: "Pengabdian Masyarakat di Desa Karangpandan",
      date: "5 November 2024",
      image: "https://images.unsplash.com/photo-1560523159-4a9692d222f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
      category: "community"
    },
    {
      id: 5,
      title: "Seminar Karir untuk Fresh Graduate",
      date: "15 Oktober 2024",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      category: "seminar"
    },
    {
      id: 6,
      title: "Webinar Penulisan Jurnal Ilmiah",
      date: "22 September 2024",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "webinar"
    },
    {
      id: 7,
      title: "Buka Puasa Bersama FORMADIKA",
      date: "15 Maret 2024",
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "gathering"
    },
    {
      id: 8,
      title: "Rapat Koordinasi Pengurus",
      date: "5 Februari 2024",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "internal"
    },
    {
      id: 9,
      title: "Kunjungan ke Sekolah Mitra",
      date: "18 Januari 2024",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      category: "education"
    }
  ];

  // Mock video data
  const videos = [
    {
      id: 101,
      title: "Profil FORMADIKA Karanganyar",
      date: "21 Februari 2024",
      thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "profile"
    },
    {
      id: 102,
      title: "Webinar: Tips Lolos Beasiswa Luar Negeri",
      date: "10 Februari 2024",
      thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "webinar"
    },
    {
      id: 103,
      title: "Alumni Success Story: Dari Bidikmisi ke Oxford",
      date: "28 Januari 2024",
      thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "success story"
    },
    {
      id: 104,
      title: "Liputan: Pengabdian Masyarakat FORMADIKA",
      date: "15 Desember 2023",
      thumbnail: "https://images.unsplash.com/photo-1560439513-74b037a25d84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "community"
    },
    {
      id: 105,
      title: "Tutorial: Mengisi Formulir Pendaftaran KIP-K",
      date: "5 November 2023",
      thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "tutorial"
    }
  ];

  const PhotoGallery = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div 
          key={photo.id} 
          className="relative rounded-lg overflow-hidden h-64 cursor-pointer group"
          onClick={() => setSelectedImage(photo)}
        >
          <img 
            src={photo.image} 
            alt={photo.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <h3 className="text-white font-semibold">{photo.title}</h3>
            <div className="flex items-center text-white text-sm mt-1">
              <Calendar size={14} className="mr-1" />
              <span>{photo.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const VideoGallery = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video) => (
        <div key={video.id} className="bg-white rounded-lg overflow-hidden shadow">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Button
                className="bg-white text-formadika-teal hover:bg-formadika-50 rounded-full w-12 h-12 flex items-center justify-center"
                onClick={() => window.open(video.videoUrl, '_blank')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">{video.title}</h3>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <Calendar size={14} className="mr-1" />
              <span>{video.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <section className="bg-formadika-600 py-16 md:py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center py-1 px-3 mb-4 rounded-full text-sm font-medium bg-white/20 text-white">
              Galeri
            </div>
            <h1 className="text-4xl font-bold mb-6">
              Galeri Dokumentasi
            </h1>
            <p className="text-xl text-formadika-50">
              Lihat dokumentasi kegiatan FORMADIKA Karanganyar melalui foto dan video.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-formadika-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="photos" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="photos">Foto</TabsTrigger>
                <TabsTrigger value="videos">Video</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="photos">
              <PhotoGallery />
            </TabsContent>
            <TabsContent value="videos">
              <VideoGallery />
            </TabsContent>
          </Tabs>
          
          {/* Button to load more */}
          <div className="mt-12 text-center">
            <Button variant="outline">Muat Lebih Banyak</Button>
          </div>
        </div>
      </section>
      
      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative bg-white">
            <img 
              src={selectedImage?.image} 
              alt={selectedImage?.title} 
              className="w-full object-contain max-h-[70vh]"
            />
            <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-white">
              <h3 className="text-lg font-semibold">{selectedImage?.title}</h3>
              <div className="flex items-center text-sm mt-1">
                <Calendar size={14} className="mr-1" />
                <span>{selectedImage?.date}</span>
              </div>
            </div>
            {/* Navigation buttons */}
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                // Handle previous image logic here
                const currentIndex = photos.findIndex(p => p.id === selectedImage?.id);
                if (currentIndex > 0) {
                  setSelectedImage(photos[currentIndex - 1]);
                } else {
                  setSelectedImage(photos[photos.length - 1]);
                }
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                // Handle next image logic here
                const currentIndex = photos.findIndex(p => p.id === selectedImage?.id);
                if (currentIndex < photos.length - 1) {
                  setSelectedImage(photos[currentIndex + 1]);
                } else {
                  setSelectedImage(photos[0]);
                }
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;
