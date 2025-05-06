
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Wifi, WifiOff, Check } from "lucide-react";
import { Event } from "@/types/database";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { RegularUser } from "@/types/database";
import { User } from "@supabase/supabase-js";

interface EventDetailInfoProps {
  event: Event;
  isRegistered: boolean;
  onRegister: () => void;
  user: User | RegularUser | null;
  eventIsFullyBooked: boolean;
  registrationClosed: boolean;
  allowGuestRegistration?: boolean;
  isLoading?: boolean;
}

export function EventDetailInfo({ 
  event, 
  isRegistered, 
  onRegister, 
  user, 
  eventIsFullyBooked,
  registrationClosed,
  allowGuestRegistration = false,
  isLoading = false
}: EventDetailInfoProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-1">{event.title}</CardTitle>
              <div className="flex gap-2 mt-1">
                <Badge variant={event.type === 'online' ? 'secondary' : 'default'} className="gap-1.5">
                  {event.type === 'online' ? (
                    <><Wifi className="h-3 w-3" /> Online</>
                  ) : (
                    <><WifiOff className="h-3 w-3" /> Offline</>
                  )}
                </Badge>
                {event.status === 'ongoing' && (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Sedang Berlangsung
                  </Badge>
                )}
                {event.status === 'upcoming' && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Akan Datang
                  </Badge>
                )}
                {event.status === 'completed' && (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    Selesai
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Tampilkan gambar event jika tersedia */}
          {event.image_url && (
            <div className="mb-6">
              <img 
                src={event.image_url} 
                alt={event.title} 
                className="w-full rounded-lg object-cover max-h-[400px]"
              />
            </div>
          )}
          
          <div 
            className="prose max-w-none mb-8" 
            dangerouslySetInnerHTML={{ __html: event.description }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Informasi Acara</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-formadika-600" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-formadika-600" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-formadika-600" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-formadika-600" />
                  <span>
                    {event.registered_participants || 0} pendaftar 
                    {event.max_participants ? ` (Kuota: ${event.max_participants})` : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Pendaftaran</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {registrationClosed ? (
            <div className="text-center py-4">
              {event.status === 'completed' ? (
                <p className="text-gray-600">Event telah selesai.</p>
              ) : event.status === 'cancelled' ? (
                <p className="text-red-600">Event telah dibatalkan.</p>
              ) : (
                <p className="text-amber-600">Pendaftaran telah ditutup. Kuota terpenuhi.</p>
              )}
            </div>
          ) : isRegistered ? (
            <div className="text-center py-4">
              <div className="bg-green-50 text-green-700 rounded-md p-4 flex items-center justify-center mb-3">
                <Check className="h-5 w-5 mr-2 text-green-500" />
                <span className="font-medium">Anda telah terdaftar</span>
              </div>
              <p className="text-gray-600">Anda telah berhasil mendaftar pada event ini.</p>
            </div>
          ) : !user ? (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">Anda harus login untuk mendaftar event ini.</p>
              <Button asChild className="w-full mb-2">
                <Link to="/login">Login</Link>
              </Button>
              <p className="text-sm text-gray-500">
                Belum punya akun? <Link to="/register-user" className="text-formadika-600 hover:underline">Daftar disini</Link>
              </p>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">
                {eventIsFullyBooked 
                  ? "Kuota pendaftaran sudah penuh"
                  : "Silahkan mendaftar untuk mengikuti event ini."
                }
              </p>
              <Button 
                onClick={onRegister} 
                className="w-full" 
                disabled={eventIsFullyBooked || isLoading}
              >
                {isLoading ? "Memproses..." : "Daftar Sekarang"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
