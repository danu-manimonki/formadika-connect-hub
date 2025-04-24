
import { supabase } from "@/integrations/supabase/client";

export const useEventImages = () => {
  const getExistingImages = async () => {
    try {
      const { data: events, error } = await supabase
        .from('events')
        .select('image_url')
        .not('image_url', 'is', null);

      if (error) throw error;

      // Filter out null values and get unique URLs
      const uniqueImages = [...new Set(events
        .map(event => event.image_url)
        .filter(url => url) as string[])];

      return uniqueImages;
    } catch (error) {
      console.error('Error fetching existing images:', error);
      return [];
    }
  };

  return { getExistingImages };
};
