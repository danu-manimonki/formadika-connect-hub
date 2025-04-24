
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CommitteeInsert, CommitteeMember } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { uploadCommitteePhoto } from "./useCommitteePhoto";

export function useCommitteeMutations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createMutation = useMutation({
    mutationFn: async ({ 
      data, 
      photo 
    }: { 
      data: CommitteeInsert, 
      photo: File | null 
    }): Promise<CommitteeMember> => {
      console.log("Creating committee member:", data);
      
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        const authError = new Error("You must be logged in to create committee members");
        console.error(authError);
        toast({
          title: "Authentication Error",
          description: "You must be logged in to create committee members",
          variant: "destructive",
        });
        throw authError;
      }

      let photoUrl = null;
      if (photo) {
        try {
          photoUrl = await uploadCommitteePhoto(photo);
        } catch (error) {
          console.error("Error uploading photo:", error);
          toast({
            title: "Error",
            description: "Failed to upload photo",
            variant: "destructive",
          });
          throw error;
        }
      }
      
      const { data: committeeData, error } = await supabase
        .from('committee')
        .insert({ ...data, photo_url: photoUrl })
        .select()
        .single();

      if (error) {
        console.error("Error creating committee member:", error);
        toast({
          title: "Error",
          description: `Failed to create committee member: ${error.message}`,
          variant: "destructive",
        });
        throw error;
      }
      
      console.log("Committee member created:", committeeData);
      return committeeData as CommitteeMember;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['committee'] });
      toast({
        title: "Success",
        description: "Committee member created successfully",
      });
    },
    onError: (error: Error) => {
      console.error("Committee creation failed:", error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ 
      id, 
      data, 
      photo 
    }: { 
      id: string, 
      data: Partial<CommitteeInsert>, 
      photo: File | null 
    }): Promise<CommitteeMember> => {
      console.log("Updating committee member:", id, data);
      
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        const authError = new Error("You must be logged in to update committee members");
        console.error(authError);
        toast({
          title: "Authentication Error",
          description: "You must be logged in to update committee members",
          variant: "destructive",
        });
        throw authError;
      }

      let photoUrl = undefined;
      if (photo) {
        try {
          photoUrl = await uploadCommitteePhoto(photo);
        } catch (error) {
          console.error("Error uploading photo:", error);
          toast({
            title: "Error",
            description: "Failed to upload photo",
            variant: "destructive",
          });
          throw error;
        }
      }
      
      const updateData = photo ? { ...data, photo_url: photoUrl } : data;
      
      const { data: committeeData, error } = await supabase
        .from('committee')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Error updating committee member:", error);
        toast({
          title: "Error",
          description: `Failed to update committee member: ${error.message}`,
          variant: "destructive",
        });
        throw error;
      }
      
      console.log("Committee member updated:", committeeData);
      return committeeData as CommitteeMember;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['committee'] });
      toast({
        title: "Success",
        description: "Committee member updated successfully",
      });
    },
    onError: (error: Error) => {
      console.error("Committee update failed:", error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string): Promise<void> => {
      console.log("Deleting committee member:", id);
      
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        const authError = new Error("You must be logged in to delete committee members");
        console.error(authError);
        toast({
          title: "Authentication Error",
          description: "You must be logged in to delete committee members",
          variant: "destructive",
        });
        throw authError;
      }
      
      const { error } = await supabase
        .from('committee')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting committee member:", error);
        toast({
          title: "Error",
          description: `Failed to delete committee member: ${error.message}`,
          variant: "destructive",
        });
        throw error;
      }
      
      console.log("Committee member deleted successfully");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['committee'] });
      toast({
        title: "Success",
        description: "Committee member deleted successfully",
      });
    },
    onError: (error: Error) => {
      console.error("Committee deletion failed:", error);
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
