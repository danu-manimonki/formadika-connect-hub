import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface CommitteeMember {
  id: string;
  name: string;
  position: string;
  period: string;
  university: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface CommitteeInsert extends Omit<CommitteeMember, 'id' | 'created_at' | 'updated_at'> {
  university: string;
}

export interface CommitteeUpdate extends Partial<CommitteeInsert> {
  id: string;
}

export function useCommittee() {
  const queryClient = useQueryClient();
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

  const uploadPhoto = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('committee-photos')
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading photo:", uploadError);
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('committee-photos')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const createCommittee = async ({ data, photo }: { data: CommitteeInsert, photo: File | null }): Promise<CommitteeMember> => {
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
        photoUrl = await uploadPhoto(photo);
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
  };

  const updateCommittee = async ({ 
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
        photoUrl = await uploadPhoto(photo);
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
  };

  const deleteCommittee = async (id: string): Promise<void> => {
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
        toast({
          title: "Success",
          description: "Committee member created successfully",
        });
      },
      onError: (error: Error) => {
        console.error("Committee creation failed:", error);
      },
    }),
    updateMutation: useMutation({
      mutationFn: updateCommittee,
      onSuccess: () => {
        console.log("Committee update successful, invalidating queries");
        queryClient.invalidateQueries({ queryKey: ['committee'] });
        toast({
          title: "Success",
          description: "Committee member updated successfully",
        });
      },
      onError: (error: Error) => {
        console.error("Committee update failed:", error);
      },
    }),
    deleteMutation: useMutation({
      mutationFn: deleteCommittee,
      onSuccess: () => {
        console.log("Committee deletion successful, invalidating queries");
        queryClient.invalidateQueries({ queryKey: ['committee'] });
        toast({
          title: "Success",
          description: "Committee member deleted successfully",
        });
      },
      onError: (error: Error) => {
        console.error("Committee deletion failed:", error);
      },
    }),
  };
}
