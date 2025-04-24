
export interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  period: string;
  university: string | null;
  status: 'active' | 'inactive';
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CommitteeInsert extends Omit<CommitteeMember, 'id' | 'created_at' | 'updated_at' | 'photo_url'> {
  university: string;
}
