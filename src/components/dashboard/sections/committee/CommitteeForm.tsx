
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CommitteeMember } from "@/hooks/queries/useCommittee";

interface CommitteeFormProps {
  editingMember: CommitteeMember | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function CommitteeForm({ editingMember, onSubmit }: CommitteeFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
