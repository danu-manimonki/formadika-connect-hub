
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash2 } from "lucide-react";
import { CommitteeMember } from "@/hooks/queries/useCommittee";

interface CommitteeTableProps {
  isLoading: boolean;
  committee: CommitteeMember[];
  onEdit: (member: CommitteeMember) => void;
  onDelete: (id: string) => void;
}

export function CommitteeTable({ 
  isLoading, 
  committee, 
  onEdit, 
  onDelete 
}: CommitteeTableProps) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="text-center py-4">
          Loading...
        </TableCell>
      </TableRow>
    );
  }

  if (committee.length === 0) {
    return (
      <TableRow>
        <TableCell
          colSpan={6}
          className="text-center py-6 text-muted-foreground"
        >
          Tidak ada data pengurus yang sesuai filter
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {committee.map((member) => (
        <TableRow key={member.id}>
          <TableCell className="font-medium">{member.name}</TableCell>
          <TableCell>{member.position}</TableCell>
          <TableCell>{member.period}</TableCell>
          <TableCell>{member.university}</TableCell>
          <TableCell>
            <div
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                member.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {member.status === "active" ? "Aktif" : "Tidak Aktif"}
            </div>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(member)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(member.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
