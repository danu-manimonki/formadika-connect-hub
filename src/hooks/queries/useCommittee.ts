
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useCommittee() {
  const queryClient = useQueryClient();

  const fetchCommittee = async () => {
    const { data, error } = await supabase
      .from('committee')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  };

  const createCommittee = async (newData: any) => {
    const { data, error } = await supabase
      .from('committee')
      .insert([newData])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const updateCommittee = async ({ id, ...updateData }: any) => {
    const { data, error } = await supabase
      .from('committee')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  const deleteCommittee = async (id: string) => {
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
