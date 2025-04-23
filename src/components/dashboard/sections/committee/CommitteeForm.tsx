
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <select
          id="status"
          name="status"
          className="w-full border rounded-md p-2"
          defaultValue={editingMember?.status || "active"}
        >
          <option value="active">Aktif</option>
          <option value="inactive">Tidak Aktif</option>
        </select>
      </div>
      <Button type="submit" className="w-full">
        {editingMember ? "Simpan Perubahan" : "Tambah Pengurus"}
      </Button>
    </form>
  );
}
