
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  period: string;
  university?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

interface CommitteeInsert extends Omit<CommitteeMember, 'id' | 'created_at' | 'updated_at'> {}
interface CommitteeUpdate extends Partial<CommitteeInsert> {
  id: string;
}

export function useCommittee() {
  const queryClient = useQueryClient();

  const fetchCommittee = async (): Promise<CommitteeMember[]> => {
    const { data, error } = await supabase
      .from('committee')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  const createCommittee = async (newData: CommitteeInsert): Promise<CommitteeMember> => {
    const { data, error } = await supabase
      .from('committee')
      .insert([newData])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateCommittee = async ({ id, ...updateData }: CommitteeUpdate): Promise<CommitteeMember> => {
    const { data, error } = await supabase
      .from('committee')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteCommittee = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('committee')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  return {
    query: useQuery({
      queryKey: ['committee'],
      queryFn: fetchCommittee,
    }),
    createMutation: useMutation({
      mutationFn: createCommittee,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['committee'] }),
    }),
    updateMutation: useMutation({
      mutationFn: updateCommittee,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['committee'] }),
    }),
    deleteMutation: useMutation({
      mutationFn: deleteCommittee,
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['committee'] }),
    }),
  };
}
