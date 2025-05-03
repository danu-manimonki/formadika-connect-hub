
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Wifi, WifiOff } from "lucide-react";
import { AuthUser } from "@/types/database";
import { Event } from "@/types/database";
import { Badge } from "../ui/badge";

interface EventDetailInfoProps {
  event: Event;
  isRegistered: boolean;
  onRegister: () => void;
  user: AuthUser | null;
  eventIsFullyBooked: boolean;
  registrationClosed: boolean;
  allowGuestRegistration?: boolean;
}

export function EventDetailInfo({ 
  event, 
  isRegistered, 
  onRegister, 
  user, 
  eventIsFullyBooked,
  registrationClosed,
  allowGuestRegistration = false
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
              <Badge className="mb-2 px-3 py-1.5 text-md">✓ Terdaftar</Badge>
              <p className="text-gray-600 mt-2">Anda telah terdaftar pada event ini.</p>
            </div>
          ) : !user && !allowGuestRegistration ? (
            <div className="text-center py-4">
              <p className="text-gray-600 mb-4">Login untuk mendaftar event ini.</p>
              <Button asChild className="w-full">
                <a href="/auth">Login / Daftar</a>
              </Button>
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
                disabled={eventIsFullyBooked}
              >
                Daftar Sekarang
              </Button>
            </div>
          )}

          {event.organizer_info && (
            <>
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold text-base mb-2">Informasi Penyelenggara</h3>
                <p className="text-sm text-gray-600">{event.organizer_info}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
