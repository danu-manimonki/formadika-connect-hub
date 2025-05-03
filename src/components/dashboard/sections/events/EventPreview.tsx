
import React, { useState } from "react";
import { Calendar, Clock, MapPin, Users, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface EventPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  eventData: {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    type: 'online' | 'offline';
    participants: number;
    image_url?: string;
  };
}

export function EventPreview({ isOpen, onClose, eventData }: EventPreviewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preview Event</DialogTitle>
        </DialogHeader>

        <div className="bg-white rounded-lg overflow-hidden">
          {eventData.image_url ? (
            <div className="h-64 overflow-hidden">
              <img 
                src={eventData.image_url} 
                alt={eventData.title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-64 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">Tidak ada gambar</span>
            </div>
          )}
          
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-xl">{eventData.title || "Judul Event"}</h3>
              <Badge className={eventData.type === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                {eventData.type === 'online' ? 'Online' : 'Offline'}
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-4">
              {eventData.description || "Deskripsi event akan muncul di sini..."}
            </p>
            
            <div className="space-y-2 text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{eventData.date || "Tanggal belum diatur"}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{eventData.time || "Waktu belum diatur"}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{eventData.location || "Lokasi belum diatur"}</span>
              </div>
              
              <div className="flex items-center">
                <Users size={16} className="mr-2" />
                <span>{eventData.participants || 0} peserta</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
