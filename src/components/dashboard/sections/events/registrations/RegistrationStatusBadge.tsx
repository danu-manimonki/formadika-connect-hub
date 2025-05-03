
import { Badge } from "@/components/ui/badge";

interface RegistrationStatusBadgeProps {
  status: string;
}

export function RegistrationStatusBadge({ status }: RegistrationStatusBadgeProps) {
  switch (status) {
    case 'registered':
      return <Badge variant="outline">Terdaftar</Badge>;
    case 'confirmed':
      return <Badge variant="secondary">Dikonfirmasi</Badge>;
    case 'attended':
      return <Badge className="bg-green-100 text-green-800">Hadir</Badge>;
    case 'cancelled':
      return <Badge variant="destructive">Dibatalkan</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
