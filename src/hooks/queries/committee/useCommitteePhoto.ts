
import { supabase } from "@/integrations/supabase/client";

export async function uploadCommitteePhoto(file: File): Promise<string> {
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
}
