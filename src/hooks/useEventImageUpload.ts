
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useEventImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true);
      
      if (!file) {
        console.log("No file provided for upload");
        return null;
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log("Starting file upload:", { fileName, filePath });

      const { error: uploadError, data } = await supabase
        .storage
        .from('events')
        .upload(filePath, file);

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        toast.error("Failed to upload image");
        throw uploadError;
      }

      console.log("Upload successful:", data);

      const { data: { publicUrl } } = supabase
        .storage
        .from('events')
        .getPublicUrl(filePath);

      console.log("Generated public URL:", publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Error uploading image");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { handleImageUpload, isUploading };
};
