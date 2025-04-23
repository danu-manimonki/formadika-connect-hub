
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  period: string;
  university?: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface CommitteeInsert extends Omit<CommitteeMember, 'id' | 'created_at' | 'updated_at'> {}
export interface CommitteeUpdate extends Partial<CommitteeInsert> {
  id: string;
}

export function useCommittee() {
  const queryClient = useQueryClient();

  const fetchCommittee = async (): Promise<CommitteeMember[]> => {
    console.log("Fetching committee data...");
    const { data, error } = await supabase
      .from('committee')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching committee data:", error);
      throw error;
    }
    console.log("Committee data fetched:", data);
    return data as CommitteeMember[];
  };

  const createCommittee = async (newData: CommitteeInsert): Promise<CommitteeMember> => {
    console.log("Creating committee member:", newData);
    const { data, error } = await supabase
      .from('committee')
      .insert([newData])
      .select()
      .single();

    if (error) {
      console.error("Error creating committee member:", error);
      throw error;
    }
    console.log("Committee member created:", data);
    return data as CommitteeMember;
  };

  const updateCommittee = async ({ id, ...updateData }: CommitteeUpdate): Promise<CommitteeMember> => {
    console.log("Updating committee member:", id, updateData);
    const { data, error } = await supabase
      .from('committee')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating committee member:", error);
      throw error;
    }
    console.log("Committee member updated:", data);
    return data as CommitteeMember;
  };

  const deleteCommittee = async (id: string): Promise<void> => {
    console.log("Deleting committee member:", id);
    const { error } = await supabase
      .from('committee')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting committee member:", error);
      throw error;
    }
    console.log("Committee member deleted successfully");
  };

  return {
    query: useQuery({
      queryKey: ['committee'],
      queryFn: fetchCommittee,
    }),
    createMutation: useMutation({
      mutationFn: createCommittee,
      onSuccess: () => {
        console.log("Committee creation successful, invalidating queries");
        queryClient.invalidateQueries({ queryKey: ['committee'] });
      },
      onError: (error) => {
        console.error("Committee creation failed:", error);
      },
    }),
    updateMutation: useMutation({
      mutationFn: updateCommittee,
      onSuccess: () => {
        console.log("Committee update successful, invalidating queries");
        queryClient.invalidateQueries({ queryKey: ['committee'] });
      },
      onError: (error) => {
        console.error("Committee update failed:", error);
      },
    }),
    deleteMutation: useMutation({
      mutationFn: deleteCommittee,
      onSuccess: () => {
        console.log("Committee deletion successful, invalidating queries");
        queryClient.invalidateQueries({ queryKey: ['committee'] });
      },
      onError: (error) => {
        console.error("Committee deletion failed:", error);
      },
    }),
  };
}
