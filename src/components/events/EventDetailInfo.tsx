
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Share2 } from "lucide-react";
import { Event } from "@/types/database";
import { Link } from "react-router-dom";

interface EventDetailInfoProps {
  event: Event;
  isRegistered: boolean;
  onRegister: () => void;
  user: any | null;
  eventIsFullyBooked: boolean;
  registrationClosed: boolean;
}

export function EventDetailInfo({ 
  event, 
  isRegistered, 
  onRegister, 
  user, 
  eventIsFullyBooked, 
  registrationClosed 
}: EventDetailInfoProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        {event.image_url && (
          <div className="rounded-lg overflow-hidden mb-8">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-auto"
            />
          </div>
        )}
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Tentang Kegiatan</h2>
          <p className="whitespace-pre-line">{event.description}</p>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h3 className="text-lg font-semibold mb-4">Informasi Event</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <Calendar className="w-5 h-5 mr-3 text-formadika-600 mt-0.5" />
              <div>
                <div className="font-medium">Tanggal</div>
                <div className="text-gray-600">{event.date}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="w-5 h-5 mr-3 text-formadika-600 mt-0.5" />
              <div>
                <div className="font-medium">Waktu</div>
                <div className="text-gray-600">{event.time}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-formadika-600 mt-0.5" />
              <div>
                <div className="font-medium">Lokasi</div>
                <div className="text-gray-600">{event.location}</div>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users className="w-5 h-5 mr-3 text-formadika-600 mt-0.5" />
              <div>
                <div className="font-medium">Peserta</div>
                <div className="text-gray-600">
                  {event.registered_participants || 0} terdaftar
                  {event.max_participants ? ` dari ${event.max_participants}` : ''}
                </div>
              </div>
            </div>
          </div>

          {event.max_participants && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Kapasitas</span>
                <span>{event.registered_participants || 0}/{event.max_participants}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-formadika-600 h-2.5 rounded-full" 
                  style={{ width: `${Math.min(((event.registered_participants || 0) / event.max_participants) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
            
          {user ? (
            isRegistered ? (
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm">
                  Anda sudah terdaftar pada kegiatan ini
                </div>
                <Button className="w-full" variant="outline">
                  Lihat Detail Pendaftaran
                </Button>
              </div>
            ) : (
              <Button 
                className="w-full" 
                onClick={onRegister}
                disabled={registrationClosed}
              >
                {registrationClosed ? (
                  eventIsFullyBooked ? 'Kuota Pendaftaran Penuh' : 'Pendaftaran Ditutup'
                ) : (
                  'Daftar Sekarang'
                )}
              </Button>
            )
          ) : (
            <div className="space-y-4">
              <Button className="w-full" asChild>
                <Link to="/auth">Login untuk Mendaftar</Link>
              </Button>
            </div>
          )}
          
          <div className="mt-4">
            <Button variant="outline" className="w-full gap-2">
              <Share2 className="h-4 w-4" /> Bagikan Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
