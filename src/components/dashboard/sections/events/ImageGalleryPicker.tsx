
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useEventImages } from "@/hooks/useEventImages";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ImageGalleryPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

export function ImageGalleryPicker({ isOpen, onClose, onSelectImage }: ImageGalleryPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"events" | "gallery">("events");
  const { getExistingImages } = useEventImages();
  
  // Fetch event images
  const { data: eventImages = [], isLoading: isLoadingEventImages } = useQuery({
    queryKey: ['eventImages'],
    queryFn: getExistingImages,
    enabled: isOpen,
  });

  // Fetch gallery images
  const { data: galleryImages = [], isLoading: isLoadingGallery } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: isOpen,
  });

  const filteredEventImages = eventImages.filter(url => 
    url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGalleryImages = galleryImages.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelect = (imageUrl: string) => {
    onSelectImage(imageUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pilih Gambar</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari gambar..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "events" | "gallery")}>
          <TabsList className="mb-4">
            <TabsTrigger value="events">Gambar dari Event</TabsTrigger>
            <TabsTrigger value="gallery">Galeri</TabsTrigger>
          </TabsList>
          
          <TabsContent value="events" className="space-y-4">
            {isLoadingEventImages ? (
              <div className="text-center py-8">Memuat gambar...</div>
            ) : filteredEventImages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "Tidak ditemukan gambar yang sesuai" : "Belum ada gambar event yang tersedia"}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredEventImages.map((imageUrl, index) => (
                  <div 
                    key={index}
                    className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border"
                    onClick={() => handleSelect(imageUrl)}
                  >
                    <img 
                      src={imageUrl} 
                      alt={`Event image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4">
            {isLoadingGallery ? (
              <div className="text-center py-8">Memuat galeri...</div>
            ) : filteredGalleryImages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "Tidak ditemukan gambar yang sesuai" : "Belum ada gambar di galeri"}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredGalleryImages.map((item) => (
                  <div 
                    key={item.id}
                    className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border relative group"
                    onClick={() => handleSelect(item.image_url)}
                  >
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-2 text-white text-xs truncate w-full">
                        {item.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
