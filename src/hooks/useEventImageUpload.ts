
import { supabase } from "@/integrations/supabase/client";

export const useEventImageUpload = () => {
  const handleImageUpload = async (file: File) => {
    try {
      if (!file) {
        return null;
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase
        .storage
        .from('events')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase
        .storage
        .from('events')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return { handleImageUpload };
};
