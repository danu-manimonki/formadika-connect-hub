
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CommitteeMember } from "../types";
import { useToast } from "@/components/ui/use-toast";

export function useCommitteeQuery() {
  const { toast } = useToast();

  const fetchCommittee = async (): Promise<CommitteeMember[]> => {
    console.log("Fetching committee data...");
    const { data, error } = await supabase
      .from('committee')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching committee data:", error);
      toast({
        title: "Error",
        description: `Failed to fetch committee data: ${error.message}`,
        variant: "destructive",
      });
      throw error;
    }
    console.log("Committee data fetched:", data);
    return data as CommitteeMember[];
  };

  return useQuery({
    queryKey: ['committee'],
    queryFn: fetchCommittee,
  });
}
