
import { supabase } from "@/integrations/supabase/client";

export const useEventImageUpload = () => {
  const handleImageUpload = async (file: File) => {
    try {
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
      throw error;
    }
  };

  return { handleImageUpload };
};
