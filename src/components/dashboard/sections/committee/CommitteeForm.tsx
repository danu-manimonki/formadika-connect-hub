
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CommitteeMember } from "@/hooks/queries/useCommittee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface CommitteeFormProps {
  editingMember: CommitteeMember | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, photo: File | null) => Promise<void>;
}

export function CommitteeForm({ editingMember, onSubmit }: CommitteeFormProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    editingMember?.photo_url || null
  );

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(e, selectedPhoto);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={previewUrl || undefined} />
          <AvatarFallback>
            {editingMember?.name?.charAt(0) || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2 w-full">
          <Label htmlFor="photo">Foto</Label>
          <Input
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="name">Nama</Label>
        <Input
          id="name"
          name="name"
          defaultValue={editingMember?.name}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="position">Jabatan</Label>
        <Input
          id="position"
          name="position"
          defaultValue={editingMember?.position}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="period">Periode</Label>
        <Input
          id="period"
          name="period"
          defaultValue={editingMember?.period}
          placeholder="contoh: 2024-2025"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="university">Universitas</Label>
        <Input
          id="university"
          name="university"
          defaultValue={editingMember?.university || ""}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select name="status" defaultValue={editingMember?.status || "active"}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Tidak Aktif</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button type="submit" className="w-full">
        {editingMember ? "Simpan Perubahan" : "Tambah Pengurus"}
      </Button>
    </form>
  );
}
