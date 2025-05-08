
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Mail, Edit, Trash2 } from "lucide-react";
import { RegistrationStatusBadge } from "./RegistrationStatusBadge";

interface RegistrationsTableProps {
  registrations: any[];
  isLoading: boolean;
  searchTerm: string;
  selectedStatus: string;
  onUpdateStatus: (registration: any) => void;
  onEdit: (registration: any) => void;
  onDelete: (id: string) => void;
}

export function RegistrationsTable({ 
  registrations, 
  isLoading, 
  searchTerm, 
  selectedStatus,
  onUpdateStatus,
  onEdit,
  onDelete
}: RegistrationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>No. Telepon</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tanggal Daftar</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              Memuat data pendaftar...
            </TableCell>
          </TableRow>
        ) : registrations.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              {searchTerm || selectedStatus !== "all" 
                ? "Tidak ada pendaftar yang sesuai filter" 
                : "Belum ada pendaftar untuk kegiatan ini"}
            </TableCell>
          </TableRow>
        ) : (
          registrations.map(registration => (
            <TableRow key={registration.id}>
              <TableCell className="font-medium">{registration.name}</TableCell>
              <TableCell>{registration.email}</TableCell>
              <TableCell>{registration.phone || "-"}</TableCell>
              <TableCell>
                <RegistrationStatusBadge status={registration.attendance_status} />
              </TableCell>
              <TableCell>
                {new Date(registration.registration_date).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateStatus(registration)}
                  >
                    Ubah Status
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEdit(registration)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDelete(registration.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
