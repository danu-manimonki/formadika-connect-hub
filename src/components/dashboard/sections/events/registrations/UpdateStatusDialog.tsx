
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UpdateStatusDialogProps {
  registration: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (status: string) => void;
}

export function UpdateStatusDialog({ registration, isOpen, onOpenChange, onUpdate }: UpdateStatusDialogProps) {
  const [newStatus, setNewStatus] = useState<string>(registration?.attendance_status || "");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Status Pendaftaran</DialogTitle>
          <DialogDescription>
            Perbarui status pendaftaran untuk {registration?.name}
          </DialogDescription>
        </DialogHeader>
        
        <Select value={newStatus} onValueChange={setNewStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status baru" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="registered">Terdaftar</SelectItem>
            <SelectItem value="confirmed">Dikonfirmasi</SelectItem>
            <SelectItem value="attended">Hadir</SelectItem>
            <SelectItem value="cancelled">Dibatalkan</SelectItem>
          </SelectContent>
        </Select>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={() => onUpdate(newStatus)}>
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
